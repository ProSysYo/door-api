import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DbService } from '../db/db.service';
import { generateSerialNumber } from './serial-number';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class OrdersService {
  constructor(private db: DbService) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.db.order.create({
      data: { ...createOrderDto, serialNumber: generateSerialNumber() },
    });
  }

  findAll(shipmentDate?: string) {
    const where: Prisma.OrderWhereInput = {};

    if (shipmentDate) {
      // Фильтр по месяцу: YYYY-MM -> [месяц-01, следующий-01)
      const start = new Date(shipmentDate + '-01');
      // Определяем первый день следующего месяца
      const nextMonth = new Date(start);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      where.shipmentDate = {
        gte: start,
        lt: nextMonth,
      };
    }

    return this.db.order.findMany({
      where,
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const item = await this.db.order.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Запись с таким id=${id} не найдена`);
    }

    return item;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.findOne(id);

    return this.db.order.update({ where: { id }, data: updateOrderDto });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.db.order.delete({ where: { id } });
  }
}
