import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLockDto } from './dto/create-lock.dto';
import { UpdateLockDto } from './dto/update-lock.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class LocksService {
  constructor(private db: DbService) {}

  create(createLockDto: CreateLockDto) {
    return this.db.lock.create({
      data: { name: createLockDto.name },
    });
  }

  findAll() {
    return this.db.lock.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    const item = await this.db.lock.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Запись с таким id=${id} не найдена`);
    }

    return item;
  }

  async update(id: number, updateLockDto: UpdateLockDto) {
    await this.findOne(id);

    return this.db.lock.update({ where: { id }, data: updateLockDto });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.db.lock.delete({ where: { id } });
  }
}
