import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEarDto } from './dto/create-ear.dto';
import { UpdateEarDto } from './dto/update-ear.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class EarsService {
  constructor(private db: DbService) {}

  create(createEarDto: CreateEarDto) {
    return this.db.ear.create({
      data: { name: createEarDto.name },
    });
  }

  findAll() {
    return this.db.ear.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    const item = await this.db.ear.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Запись с таким id=${id} не найдена`);
    }

    return item;
  }

  async update(id: number, updateEarDto: UpdateEarDto) {
    await this.findOne(id);

    return this.db.ear.update({ where: { id }, data: updateEarDto });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.db.ear.delete({ where: { id } });
  }
}
