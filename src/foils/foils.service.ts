import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoilDto } from './dto/create-foil.dto';
import { UpdateFoilDto } from './dto/update-foil.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class FoilsService {
  constructor(private db: DbService) {}

  create(createFoilDto: CreateFoilDto) {
    return this.db.foil.create({
      data: { name: createFoilDto.name },
    });
  }

  findAll() {
    return this.db.foil.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    const item = await this.db.foil.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Запись с таким id=${id} не найдена`);
    }

    return item;
  }

  async update(id: number, updateFoilDto: UpdateFoilDto) {
    await this.findOne(id);

    return this.db.foil.update({ where: { id }, data: updateFoilDto });
  }

  async remove(id: number) {
    await this.findOne(id)

    return this.db.foil.delete({where: {id}})
  }
}
