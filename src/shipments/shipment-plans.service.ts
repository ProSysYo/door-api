import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { ShipmentPlanDto } from './dto/shipment-plan.dto';

@Injectable()
export class ShipmentPlansService {
  constructor(private db: DbService) {}

  async planShipments(dto: ShipmentPlanDto) {
    const { date, setOrderIds, removeOrderIds } = dto;

    const setIds = setOrderIds ?? [];
    const removeIds = removeOrderIds ?? [];

    // removeOrderIds имеет приоритет — исключаем из setOrderIds
    const removeSet = new Set(removeIds);
    const effectiveSetIds = setIds.filter((id) => !removeSet.has(id));

    // Собираем все уникальные ID для валидации
    const allIds = [...new Set([...effectiveSetIds, ...removeIds])];

    if (allIds.length === 0) {
      // Оба списка пусты — нет изменений, возвращаем успех
      return { updated: 0, removed: 0 };
    }

    // Валидация: все ID должны существовать
    const found = await this.db.order.findMany({
      where: { id: { in: allIds } },
      select: { id: true },
    });

    const foundIds = new Set(found.map((o) => o.id));
    const notFoundIds = allIds.filter((id) => !foundIds.has(id));

    if (notFoundIds.length > 0) {
      throw new NotFoundException(
        `Заказы не найдены: [${notFoundIds.join(', ')}]`,
      );
    }

    // Атомарное обновление
    await this.db.$transaction([
      ...(effectiveSetIds.length > 0
        ? [
            this.db.order.updateMany({
              where: { id: { in: effectiveSetIds } },
              data: { shipmentDate: date },
            }),
          ]
        : []),
      ...(removeIds.length > 0
        ? [
            this.db.order.updateMany({
              where: { id: { in: removeIds } },
              data: { shipmentDate: null },
            }),
          ]
        : []),
    ]);

    return {
      updated: effectiveSetIds.length,
      removed: removeIds.length,
    };
  }
}
