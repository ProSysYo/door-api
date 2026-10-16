import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateKnobDto } from './dto/create-knob.dto';
import { UpdateKnobDto } from './dto/update-knob.dto';

@Injectable()
export class KnobsService {
  constructor(private db: DbService) {}

  create(createKnobDto: CreateKnobDto) {
    return this.db.knob.create({ data: { name: createKnobDto.name } });
  }

  findAll() {
    return this.db.knob.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const knob = await this.db.knob.findUnique({ where: { id } });

    if (!knob) {
      throw new NotFoundException(`Knob #${id} not found`);
    }

    return knob;
  }

  async update(id: number, updateKnobDto: UpdateKnobDto) {
    await this.findOne(id);

    return this.db.knob.update({ where: { id }, data: updateKnobDto });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.db.knob.delete({ where: { id } });
  }
}
