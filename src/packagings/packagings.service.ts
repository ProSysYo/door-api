import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreatePackagingDto } from './dto/create-packaging';
import { UpdatePackagingDto } from './dto/update-packaging';

@Injectable()
export class PackagingsService {
  constructor(private db: DbService) {}

  create(createPackagingDto: CreatePackagingDto) {
    return this.db.packaging.create({
      data: { name: createPackagingDto.name },
    });
  }

  findAll() {
    return this.db.packaging.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: number) {
    const item = await this.db.packaging.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Запись с таким id=${id} не найдена`);
    }

    return item;
  }

  async update(id: number, updatePackagingDto: UpdatePackagingDto) {
    await this.findOne(id)

    return this.db.packaging.update({where: {id}, data: updatePackagingDto})
  }

  async remove (id: number) {
    await this.findOne(id)

    return this.db.packaging.delete({where: {id}})
  }
}
