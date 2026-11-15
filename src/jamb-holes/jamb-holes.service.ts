import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJambHoleDto } from './dto/create-jamb-hole.dto';
import { UpdateJambHoleDto } from './dto/update-jamb-hole.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class JambHolesService {
  constructor(private db: DbService) {}

  create(createJambHoleDto: CreateJambHoleDto) {
    return this.db.jambHole.create({
      data: { name: createJambHoleDto.name },
    });
  }

  findAll() {
    return this.db.jambHole.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    const item = await this.db.jambHole.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Запись с таким id=${id} не найдена`);
    }

    return item;
  }

  async update(id: number, updateJambHoleDto: UpdateJambHoleDto) {
    await this.findOne(id);

    return this.db.jambHole.update({ where: { id }, data: updateJambHoleDto });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.db.jambHole.delete({ where: { id } });
  }
}
