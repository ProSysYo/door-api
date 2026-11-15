import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoltDto } from './dto/create-bolt.dto';
import { UpdateBoltDto } from './dto/update-bolt.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class BoltsService {
  constructor(private db: DbService) {}

  create(createBoltDto: CreateBoltDto) {
    return this.db.bolt.create({
      data: { name: createBoltDto.name },
    });
  }

  findAll() {
    return this.db.bolt.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    const item = await this.db.bolt.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Запись с таким id=${id} не найдена`);
    }

    return item;
  }

  async update(id: number, updateBoltDto: UpdateBoltDto) {
    await this.findOne(id);

    return this.db.bolt.update({ where: { id }, data: updateBoltDto });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.db.bolt.delete({ where: { id } });
  }
}
