import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHingeDto } from './dto/create-hinge.dto';
import { UpdateHingeDto } from './dto/update-hinge.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class HingesService {
  constructor(private db: DbService) {}

  create(createHingeDto: CreateHingeDto) {
    return this.db.hinge.create({
      data: { name: createHingeDto.name },
    });
  }

  findAll() {
    return this.db.hinge.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    const item = await this.db.hinge.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Запись с таким id=${id} не найдена`);
    }

    return item;
  }

  async update(id: number, updateHingeDto: UpdateHingeDto) {
    await this.findOne(id);

    return this.db.hinge.update({ where: { id }, data: updateHingeDto });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.db.hinge.delete({ where: { id } });
  }
}
