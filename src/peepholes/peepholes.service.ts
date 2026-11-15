import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePeepholeDto } from './dto/create-peephole.dto';
import { UpdatePeepholeDto } from './dto/update-peephole.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class PeepholesService {
  constructor(private db: DbService) {}

  create(createPeepholeDto: CreatePeepholeDto) {
    return this.db.peephole.create({
      data: { name: createPeepholeDto.name },
    });
  }

  findAll() {
    return this.db.peephole.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    const item = await this.db.peephole.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Запись с таким id=${id} не найдена`);
    }

    return item;
  }

  async update(id: number, updatePeepholeDto: UpdatePeepholeDto) {
    await this.findOne(id);

    return this.db.peephole.update({ where: { id }, data: updatePeepholeDto });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.db.peephole.delete({ where: { id } });
  }
}
