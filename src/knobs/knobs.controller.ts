import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { KnobsService } from './knobs.service';
import { CreateKnobDto } from './dto/create-knob.dto';
import { UpdateKnobDto } from './dto/update-knob.dto';
import { Knob } from './entities/knob.entity';

@ApiTags('knobs')
@Controller('knobs')
export class KnobsController {
  constructor(private readonly knobsService: KnobsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Ручка успешно создана',
    type: Knob,
  })
  create(@Body() createKnobDto: CreateKnobDto) {
    return this.knobsService.create(createKnobDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Список всех ручек',
    type: [Knob],
  })
  findAll() {
    return this.knobsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Информация о ручке',
    type: Knob,
  })
  @ApiNotFoundResponse({ description: 'Ручка не найдена' })
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.knobsService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Ручка успешно обновлена',
    type: Knob,
  })
  @ApiNotFoundResponse({ description: 'Ручка не найдена' })
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateKnobDto: UpdateKnobDto,
  ) {
    return this.knobsService.update(id, updateKnobDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'Ручка успешно удалена',
  })
  @ApiNotFoundResponse({ description: 'Ручка не найдена' })
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.knobsService.remove(id);
  }
}
