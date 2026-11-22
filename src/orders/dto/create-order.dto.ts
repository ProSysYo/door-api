import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import {
  toDate,
  toNumber,
  toNumberOrUndefined,
} from '../../common/transformers/coerce.transformers';

/**
 * Заказ. Справочные поля приходят со фронта строками (id/код выбранной позиции),
 * поэтому хранятся как string. Размеры, количество и стоимость — числа.
 */
export class CreateOrderDto {
  // Заказ
  @ApiProperty({ description: 'Заказчик', example: 'D001' })
  @IsString()
  @IsNotEmpty({ message: 'Выберите заказчика' })
  customerCode: string;

  @ApiProperty({ description: 'Дата оформления', example: '2026-11-22' })
  @Transform(toDate)
  @IsDate({ message: 'Укажите дату оформления' })
  orderDate: Date;

  @ApiProperty({ description: 'Количество дверей', example: 2 })
  @Transform(toNumber)
  @IsInt({ message: 'Минимум 1 дверь' })
  @Min(1, { message: 'Минимум 1 дверь' })
  @Max(9999, { message: 'Слишком большое количество дверей' })
  doorsCount: number;

  @ApiProperty({ description: 'Примечание', example: '', required: false })
  @IsString()
  @MaxLength(420, { message: 'Не более 420 символов' })
  note: string;

  // Конструктив
  @ApiProperty({ description: 'Модель полотна', example: 'Эконом' })
  @IsString()
  @IsNotEmpty({ message: 'Выберите модель полотна' })
  model: string;

  @ApiProperty({ description: 'Модель коробки', example: 'Стандарт' })
  @IsString()
  @IsNotEmpty({ message: 'Выберите модель коробки' })
  frameModel: string;

  @ApiProperty({ description: 'Толщина полотна', example: 40 })
  @Transform(toNumber)
  @IsInt({ message: 'Выберите толщину полотна' })
  @IsPositive({ message: 'Выберите толщину полотна' })
  leafThickness: number;

  @ApiProperty({ description: 'Высота', example: 2000 })
  @Transform(toNumber)
  @IsNumber({}, { message: 'Укажите высоту' })
  @IsPositive({ message: 'Укажите высоту' })
  height: number;

  @ApiProperty({ description: 'Ширина', example: 860 })
  @Transform(toNumber)
  @IsNumber({}, { message: 'Укажите ширину' })
  @IsPositive({ message: 'Укажите ширину' })
  width: number;

  @ApiProperty({ description: 'Ширина рабочей створки', example: 800, required: false })
  @Transform(toNumberOrUndefined)
  @IsOptional()
  @IsNumber({}, { message: 'Должно быть положительным числом' })
  @IsPositive({ message: 'Должно быть положительным числом' })
  leafWidth?: number;

  @ApiProperty({ description: 'Толщина металла полотна', example: 1.2 })
  @Transform(toNumber)
  @IsNumber({}, { message: 'Укажите толщину металла полотна' })
  @IsPositive({ message: 'Укажите толщину металла полотна' })
  leafMetalThickness: number;

  @ApiProperty({ description: 'Толщина металла короба', example: 1.5 })
  @Transform(toNumber)
  @IsNumber({}, { message: 'Укажите толщину металла короба' })
  @IsPositive({ message: 'Укажите толщину металла короба' })
  frameMetalThickness: number;

  @ApiProperty({ description: 'Отверстия в коробе', example: '80x40x6шт' })
  @IsString()
  @IsNotEmpty({ message: 'Укажите отверстия в коробе' })
  jambHole: string;

  @ApiProperty({ description: 'Уши', example: '80x40x6шт' })
  @IsString()
  @IsNotEmpty({ message: 'Укажите уши' })
  ear: string;

  @ApiProperty({ description: 'Петли', example: 'Баррас' })
  @IsString()
  @IsNotEmpty({ message: 'Укажите петли' })
  hinge: string;

  @ApiProperty({ description: 'Сторонность петель', example: 'Левая' })
  @IsString()
  @IsNotEmpty({ message: 'Укажите сторонность петель' })
  hingeSide: string;

  @ApiProperty({ description: '3 петли', example: false })
  @IsBoolean({ message: 'Должно быть булевым значением' })
  hingeCount3: boolean;

  // Замки и фурнитура
  @ApiProperty({ description: 'Основной замок', example: 'Гардиан' })
  @IsString()
  @IsNotEmpty({ message: 'Выберите основной замок' })
  mainLock: string;

  @ApiProperty({ description: 'Накладки основного замка', example: 'Металл' })
  @IsString()
  @IsNotEmpty({ message: 'Выберите накладки основного замка' })
  mainPad: string;

  @ApiProperty({ description: 'Ручки', example: 'A-Line' })
  @IsString()
  @IsNotEmpty({ message: 'Выберите ручки' })
  knob: string;

  @ApiProperty({ description: 'Засов', example: 'Ночной' })
  @IsString()
  @IsNotEmpty({ message: 'Выберите засов' })
  bolt: string;

  @ApiProperty({ description: 'Цилиндр основного замка', example: 'Ключ/вертушка' })
  @IsString()
  @IsNotEmpty({ message: 'Выберите цилиндр основного замка' })
  mainLockCylinder: string;

  @ApiProperty({ description: 'Дополнительный замок', example: 'Гардиан 3011' })
  @IsString()
  @IsNotEmpty({ message: 'Выберите дополнительный замок' })
  extraLock: string;

  @ApiProperty({ description: 'Накладки доп. замка', example: 'Металл' })
  @IsString()
  @IsNotEmpty({ message: 'Выберите накладки доп. замка' })
  extraPad: string;

  @ApiProperty({ description: 'Цилиндр доп. замка', example: 'Ключ/вертушка' })
  @IsString()
  @IsNotEmpty({ message: 'Выберите цилиндр доп замка' })
  extraLockCylinder: string;

  // Покраска
  @ApiProperty({ description: 'Покраска', example: 'Белый' })
  @IsString()
  @IsNotEmpty({ message: 'Выберите покраску' })
  paint: string;

  // Отделка снаружи
  @ApiProperty({ description: 'Отделка снаружи', example: 'МДФ' })
  @IsString()
  @IsNotEmpty({ message: 'Выберите отделку снаружи' })
  outsideFinish: string;

  @ApiProperty({ description: 'Плёнка снаружи', example: 'белёный дуб' })
  @IsString()
  @IsNotEmpty({ message: 'Выберите плёнку снаружи' })
  outsideFoil: string;

  // Отделка внутри
  @ApiProperty({ description: 'Отделка внутри', example: 'МДФ' })
  @IsString()
  @IsNotEmpty({ message: 'Выберите отделку внутри' })
  insideFinish: string;

  @ApiProperty({ description: 'Плёнка внутри', example: 'белёный дуб' })
  @IsString()
  @IsNotEmpty({ message: 'Выберите плёнку внутри' })
  insideFoil: string;

  // Наличник
  @ApiProperty({ description: 'Плёнка наличника', example: 'белёный дуб' })
  @IsString()
  @IsNotEmpty({ message: 'Выберите плёнку наличника' })
  casingFoil: string;

  // Дополнительные элементы
  @ApiProperty({ description: 'Уличная дверь', example: false })
  @IsBoolean({ message: 'Должно быть булевым значением' })
  streetDoor: boolean;

  @ApiProperty({ description: 'Эксцентрик', example: false })
  @IsBoolean({ message: 'Должно быть булевым значением' })
  eccentric: boolean;

  @ApiProperty({ description: 'Задний лист', example: false })
  @IsBoolean({ message: 'Должно быть булевым значением' })
  backSheet: boolean;

  @ApiProperty({ description: 'Термокабель', example: false })
  @IsBoolean({ message: 'Должно быть булевым значением' })
  thermalCable: boolean;

  @ApiProperty({ description: 'Усиление под доводчик', example: false })
  @IsBoolean({ message: 'Должно быть булевым значением' })
  closerReinforcement: boolean;

  @ApiProperty({ description: 'Доводчик', example: false })
  @IsBoolean({ message: 'Должно быть булевым значением' })
  closer: boolean;

  @ApiProperty({ description: 'Электромагнит', example: false })
  @IsBoolean({ message: 'Должно быть булевым значением' })
  electromagnet: boolean;

  @ApiProperty({ description: 'Подсветка', example: false })
  @IsBoolean({ message: 'Должно быть булевым значением' })
  lighting: boolean;

  @ApiProperty({ description: 'Шумоизоляция', example: false })
  @IsBoolean({ message: 'Должно быть булевым значением' })
  soundproofing: boolean;

  // Упаковка и стоимость
  @ApiProperty({ description: 'Упаковка', example: 'Упаковка Софт' })
  @IsString()
  @IsNotEmpty({ message: 'Выберите упаковку' })
  packaging: string;

  @ApiProperty({ description: 'Стоимость', example: 45000 })
  @Transform(toNumber)
  @IsNumber({}, { message: 'Укажите стоимость' })
  @IsPositive({ message: 'Укажите стоимость' })
  price: number;
}
