# Door API — бэкенд

Бэкенд для системы управления производством железных дверей. NestJS, Prisma 7, PostgreSQL.
Фронтенд (`door-client`) — Next.js SPA, ходит через `axios` с `withCredentials: true`.

## Стек

- **NestJS 12**, TypeScript 6.0.2 (`"strict": true`, `"strictPropertyInitialization": false`)
- **Prisma 7.10** + `@prisma/adapter-pg` (PostgreSQL, `PrismaPg`)
- `@nestjs/swagger` — Swagger на `/api`
- `class-validator` / `class-transformer` — валидация DTO
- oxlint (`npm run lint`) — `no-floating-promises: error`
- Prettier (`npm run format`) — single quote, trailing comma all
- Jest (`npm test`) — e2e и unit
- Порт `process.env.PORT ?? 3001`

## Команды

```bash
npm run start:dev   # dev-сервер, :3001
npm run build         # nest build
npm run format        # prettier
npm run lint          # oxlint
npm test              # jest
```

Swagger доступен на `/api`.

## Архитектура модуля

```
src/<slug>/
  <slug>.controller.ts   # контроллер, декораторы, Swagger-теги
  <slug>.service.ts      # бизнес-логика, вызовы Prisma
  <slug>.module.ts       # @Module()
  dto/
    create-<slug>.dto.ts
    update-<slug>.dto.ts
  entities/
    <slug>.entity.ts     # DTO для Swagger (class-based)
```

**Конвенция имён:**
- Контроллеры — `<slug>.controller.ts`, сервисы — `<slug>.service.ts` (без префикса `create-`/`update-`).
- DTO — `create-<slug>.dto.ts` для POST, `update-<slug>.dto.ts` для PATCH.
- Entity для Swagger — `entities/<slug>.entity.ts` (`@ApiProperty()`).
- Импортировать сервис из `../<slug>.service`, а не из `index`.

## Ответы API

### Обёртка `ApiResponse<T>`

Глобальный `ResponseInterceptor` оборачивает все ответы:
```ts
{ data: T | null, error: string | null, errors: Record<string, string[]> | null }
```

- Успех → `{ data: ..., error: null, errors: null }`
- 400 валидация → `{ data: null, error: "Валидация не пройдена", errors: { fieldName: ["message"] } }`
- Неизвестная ошибка → `{ data: null, error: "Сообщение", errors: null }`

**Важно:** сервисы возвращают **чистые данные** (`T`), а не обёртку. Интерцептор сам добавляет `ApiResponse`.

### Фильтрация ошибок

`AllExceptionsFilter`:
- Prisma `P2002` (unique) → **409**
- Prisma `P2025` (not found) → **404**
- `ValidationError[]` → группируется в `errors` через `exceptionFactory` в `ValidationConfigPipe`

### `ValidationConfigPipe`

Глобально установлен в `app.module.ts` с опциями:
```ts
{ whitelist: true, transform: true, exceptionFactory }
```

- `whitelist: true` — убирает поля, не объявленные в DTO.
- `transform: true` — преобразует plain-объекты из запроса в DTO-инстансы (нужно для `@Type()`).

## DTO и валидация

### Коэрсивные трансформеры

`src/common/transformers/coerce.transformers.ts`:

```ts
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

// Строка → number (пустая строка → NaN → отвалится на @IsNumber/@IsInt)
@Transform(({ value }) => (typeof value === 'string' ? Number(value.trim()) : value))

// Строка → number, '' и undefined → undefined (проходит @IsOptional)
@Transform(({ value }) => {
  if (value === '' || value === undefined) return undefined;
  return typeof value === 'string' ? Number(value.trim()) : value;
})

// ISO-строка '2026-11-22' → Date
@Transform(({ value }) =>
  typeof value === 'string' && value.trim() !== '' ? new Date(value) : value
)
```

**Правило:** все поля в DTO, принимающие число или дату, должны использовать `@Transform` из `coerce.transformers.ts`, потому что контролируемый input на фронте всегда шлёт строку.

### Пример DTO

```ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { toNumberOrUndefined, toDate } from '../../common/transformers/coerce.transformers';

export class CreateDoorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Transform(toNumberOrUndefined)
  doorsCount?: number;
}
```

## База данных

### Подключение

`DbService` наследуется от `PrismaClient`, использует `PrismaPg` adapter.
URL из `DATABASE_URL`. Сессия подключается при `onModuleInit`.

### Генерация клиента

```bash
npx prisma generate --schema=./prisma/schema.prisma --config=./prisma7.config.ts
```

Импортировать клиент строго так:
```ts
import { Prisma } from '../generated/prisma/client.js'; // для типов
import { PrismaClient } from '../generated/prisma/client.js'; // для инстанса
```

### `Prisma`-типы

Импортировать из `generated/prisma/client.js`:
- `Prisma.OrderWhereInput` — для `where` в `findMany`
- `Prisma.OrderCreateInput` — для `create`
- `Prisma.OrderUpdateInput` — для `update`

**Никаких `import { Prisma } from '@prisma/client'`!**

### Типы данных

| Prisma | TS | Примечание |
|--------|-----|------------|
| `DateTime @db.Date` | `string` (ISO) | UTC midnight. Для фильтрации месяца использовать `gte`/`lt`. |
| `Int` | `number` | |
| `Float` | `number` | |
| `String` | `string` | |
| `Boolean` | `boolean` | |
| `DateTime @default(now())` | `Date` | |

### Фильтрация по дате (месяц)

Поля `orderDate` и `shipmentDate` — `DateTime @db.Date` (UTC midnight). Для фильтрации по месяцу:

```ts
const [year, month] = shipmentDate.split('-'); // '2026-12'
const start = new Date(`${year}-${month}-01`);
const end = new Date(start);
end.setMonth(end.getMonth() + 1);

where.shipmentDate = {
  gte: start,
  lt: end,
};
```

**Не использовать** `equals` для месячного фильтра — придёт только первый день.

## Авторизация

### Cookie-сессия

- Токен — `access-token`, httpOnly cookie.
- `CookieService`: `sameSite: 'none'`, `secure: true`, maxAge 24ч.
- `AuthGuard` — проверяет JWT в куки, кладёт `req['session']`.

### CORS

```ts
origin: ['http://localhost:3000'],
credentials: true,
```

### Guard

`AuthGuard` — `@UseGuards(AuthGuard)` на конкретных контроллерах.
Глобальный `APP_GUARD` не установлен.

## Фронтенд (door-client) — что ждёт бэкенд

### Архитектура

Next.js 16.4.1 (App Router, Turbopack), React 19, TS strict, Tailwind v4, shadcn.
Feature-Sliced Design: `app → features → entities → shared → config`. Обратные импорты запрещены.

### Данные

- **Только один источник:** `useXxx` из `entities/<slug>/queries.ts` (`@tanstack/react-query` v5).
- `axios` только через `shared/api/base-api.ts` (`baseURL` из `NEXT_PUBLIC_API_URL`, `withCredentials: true`).
- Интерцептор axios разворачивает `ApiResponse.data` — компонент получает чистые данные.
- **Никаких моков** — нет данных → пустое состояние, не демо-массив.
- `staleTime` ≥ 1 мин. Мутация инвалидирует весь `queryKey` среза.
- Ленивая загрузка: `enabled: boolean` в хуке, данные грузятся при открытии модалки.

### Ключевые эндпоинты

| Метод | Путь | Описание |
|-------|------|----------|
| `GET` | `/orders` | Список заказов. Query: `shipmentDate=YYYY-MM` (месяц) |
| `POST` | `/shipments/plan` | Установить план отгрузки. Тело: `{ date, setOrderIds, removeOrderIds }` |
| `POST` | `/auth/login` | Логин |
| `POST` | `/auth/register` | Регистрация |
| `POST` | `/auth/logout` | Выход |

### Формат DTO для `POST /shipments/plan`

Фронт шлёт плоские массивы id:

```ts
{
  date: string;             // 'YYYY-MM-DD'
  setOrderIds: number[];    // [1, 2, 3] — id заказов на установку
  removeOrderIds: number[]; // [4, 5] — id заказов для удаления из плана
}
```

Приоритет при пересечении множеств: `removeOrderIds` важнее `setOrderIds`.
Пустые списки → `{ updated: 0, removed: 0 }`, без обращения к БД.

## Контракт с фронтом

Известные рассинхроны устранены:
1. `ShipmentPlanDto` принимает `setOrderIds: number[]` / `removeOrderIds: number[]` — как и шлёт фронт.
2. `OrdersService.findAll` фильтрует месяц через `gte`/`lt` (см. «Фильтрация по дате»).

Актуальное, что нужно помнить при правках:
- `shipmentDate`/`orderDate` уходят в JSON полным ISO (`"2026-11-25T00:00:00.000Z"`), а не
  `"YYYY-MM-DD"`. Фронт нормализует на границе API
  (`door-client/entities/shipment-plan/shipment-plan.api.ts`). Любое новое чтение этих полей
  на клиенте — тоже через UTC-день, не через `new Date().getDate()`.
- `GET /orders` возвращает все поля Prisma (`findMany` без `select`), включая `shipmentDate`.

## Не трогать

- `package-lock.json` — ставить пакеты только через `npm install`.
- `dist/` — не редактировать.
- `prisma/schema.prisma` — изменения только через `prisma migrate`.
- `node_modules/` — не редактировать.
