import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class ModelsService {
  constructor(private db: DbService) {}

  create(createModelDto: CreateModelDto) {
    return this.db.model.create({
      data: { name: createModelDto.name },
    });
  }

  findAll() {
    return this.db.model.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    const item = await this.db.model.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Запись с таким id=${id} не найдена`);
    }

    return item;
  }

  async update(id: number, updateModelDto: UpdateModelDto) {
    await this.findOne(id);

    return this.db.model.update({ where: { id }, data: updateModelDto });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.db.model.delete({ where: { id } });
  }
}
