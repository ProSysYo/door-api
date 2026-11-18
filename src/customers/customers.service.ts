import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class CustomersService {
  constructor(private db: DbService) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.db.customer.create({
      data: { name: createCustomerDto.name, code: createCustomerDto.code },
    });
  }

  findAll() {
    return this.db.customer.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    const item = await this.db.customer.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Запись с таким id=${id} не найдена`);
    }

    return item;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    await this.findOne(id);

    return this.db.customer.update({ where: { id }, data: updateCustomerDto });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.db.customer.delete({ where: { id } });
  }
}
