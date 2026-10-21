import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaintService } from './paints.service';
import { CreatePaintDto } from './dto/create-paint.dto';
import { UpdatePaintDto } from './dto/update-paint.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Paint } from './entities/paint.entity';

@ApiTags('paints')
@Controller('paints')
export class PaintController {
  constructor(private readonly paintService: PaintService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Цвет покраски успешно создан ',
    type: Paint,
  })
  create(@Body() createPaintDto: CreatePaintDto) {
    return this.paintService.create(createPaintDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Список всех цветов покраски',
    type: [Paint],
  })
  findAll() {
    return this.paintService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Информация о цвете поркаски',
    type: Paint,
  })
  findOne(@Param('id') id: string) {
    return this.paintService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Цвет покраски успешно обновлено',
    type: Paint,
  })
  update(@Param('id') id: string, @Body() updatePaintDto: UpdatePaintDto) {
    return this.paintService.update(+id, updatePaintDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Ручка успешно удалена',
  })
  @ApiNotFoundResponse({ description: 'Цвет покраски не найден' })
  remove(@Param('id') id: string) {
    return this.paintService.remove(+id);
  }
}
