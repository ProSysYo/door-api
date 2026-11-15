import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePadDto } from './dto/create-pad.dto';
import { UpdatePadDto } from './dto/update-pad.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class PadsService {
  constructor(private db: DbService) {}

  create(createPadDto: CreatePadDto) {
    return this.db.pad.create({
      data: { name: createPadDto.name },
    });
  }

  findAll() {
    return this.db.pad.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    const item = await this.db.pad.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Запись с таким id=${id} не найдена`);
    }

    return item;
  }

  async update(id: number, updatePadDto: UpdatePadDto) {
    await this.findOne(id);

    return this.db.pad.update({ where: { id }, data: updatePadDto });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.db.pad.delete({ where: { id } });
  }
}
