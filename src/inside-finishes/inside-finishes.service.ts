import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInsideFinishDto } from './dto/create-inside-finish.dto';
import { UpdateInsideFinishDto } from './dto/update-inside-finish.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class InsideFinishesService {
  constructor(private db: DbService) {}

  create(createInsideFinishDto: CreateInsideFinishDto) {
    return this.db.insideFinish.create({
      data: { name: createInsideFinishDto.name },
    });
  }

  findAll() {
    return this.db.insideFinish.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    const item = await this.db.insideFinish.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Запись с таким id=${id} не найдена`);
    }

    return item;
  }

  async update(id: number, updateInsideFinishDto: UpdateInsideFinishDto) {
    await this.findOne(id);

    return this.db.insideFinish.update({ where: { id }, data: updateInsideFinishDto });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.db.insideFinish.delete({ where: { id } });
  }
}
