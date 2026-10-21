import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaintDto } from './dto/create-paint.dto';
import { UpdatePaintDto } from './dto/update-paint.dto';
import { DbService } from '../db/db.service';

@Injectable()
export class PaintService {
  constructor(private db: DbService) {}

  create(createPaintDto: CreatePaintDto) {
    return this.db.paint.create({ data: { name: createPaintDto.name } });
  }

  findAll() {
    return this.db.paint.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    const paint = await this.db.paint.findUnique({ where: { id } });
    if (!paint) {
      throw new NotFoundException(`Цвет покраски с id=${id} не найден`);
    }
    return paint;
  }

  update(id: number, updatePaintDto: UpdatePaintDto) {
    return this.db.paint.update({ where: { id }, data: updatePaintDto });
  }

  remove(id: number) {
    return this.db.paint.delete({ where: { id } });
  }
}
