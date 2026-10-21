import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { KnobsService } from './knobs.service';
import { CreateKnobDto } from './dto/create-knob.dto';
import { UpdateKnobDto } from './dto/update-knob.dto';
import { Knob } from './entities/knob.entity';
import {
  ApiDataListResponse,
  ApiDataResponse,
  ApiErrorResponse,
  ApiValidationErrorResponse,
} from '../common/swagger/api-envelope';

@ApiTags('knobs')
@Controller('knobs')
export class KnobsController {
  constructor(private readonly knobsService: KnobsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Ручка успешно создана',
    type: ApiDataResponse(Knob),
  })
  @ApiBadRequestResponse({
    description: 'Ошибка валидации названия',
    type: ApiValidationErrorResponse,
  })
  create(@Body() createKnobDto: CreateKnobDto) {
    return this.knobsService.create(createKnobDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Список всех ручек',
    type: ApiDataListResponse(Knob),
  })
  findAll() {
    return this.knobsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Информация о ручке',
    type: ApiDataResponse(Knob),
  })
  @ApiNotFoundResponse({
    description: 'Ручка не найдена',
    type: ApiErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'id должен быть числом',
    type: ApiErrorResponse,
  })
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.knobsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Ручка успешно обновлена',
    type: ApiDataResponse(Knob),
  })
  @ApiNotFoundResponse({
    description: 'Ручка не найдена',
    type: ApiErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'id должен быть числом или ошибка валидации',
    type: ApiValidationErrorResponse,
  })
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateKnobDto: UpdateKnobDto,
  ) {
    return this.knobsService.update(id, updateKnobDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Ручка успешно удалена' })
  @ApiNotFoundResponse({
    description: 'Ручка не найдена',
    type: ApiErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'id должен быть числом',
    type: ApiErrorResponse,
  })
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.knobsService.remove(id);
  }
}
