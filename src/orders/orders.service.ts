import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class OrdersService {
  constructor(private db: DbService) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.db.order.create({
      data: createOrderDto,
    });
  }

  findAll() {
    return this.db.order.findMany({ orderBy: { id: 'desc' } });
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
