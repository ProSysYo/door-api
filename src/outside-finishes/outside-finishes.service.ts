import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOutsideFinishDto } from './dto/create-outside-finish.dto';
import { UpdateOutsideFinishDto } from './dto/update-outside-finish.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class OutsideFinishesService {
  constructor(private db: DbService) {}

  create(createOutsideFinishDto: CreateOutsideFinishDto) {
    return this.db.outsideFinish.create({
      data: { name: createOutsideFinishDto.name },
    });
  }

  findAll() {
    return this.db.outsideFinish.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    const item = await this.db.outsideFinish.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Запись с таким id=${id} не найдена`);
    }

    return item;
  }

  async update(id: number, updateOutsideFinishDto: UpdateOutsideFinishDto) {
    await this.findOne(id);

    return this.db.outsideFinish.update({ where: { id }, data: updateOutsideFinishDto });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.db.outsideFinish.delete({ where: { id } });
  }
}
