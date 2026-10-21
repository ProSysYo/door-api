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
import { PaintsService } from './paints.service';
import { CreatePaintDto } from './dto/create-paint.dto';
import { UpdatePaintDto } from './dto/update-paint.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Paint } from './entities/paint.entity';
import {
  ApiDataListResponse,
  ApiDataResponse,
  ApiErrorResponse,
  ApiValidationErrorResponse,
} from '../common/swagger/api-envelope';

@ApiTags('paints')
@Controller('paints')
export class PaintsController {
  constructor(private readonly paintsService: PaintsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Цвет покраски успешно создан',
    type: ApiDataResponse(Paint),
  })
  @ApiBadRequestResponse({
    description: 'Ошибка валидации названия',
    type: ApiValidationErrorResponse,
  })
  create(@Body() createPaintDto: CreatePaintDto) {
    return this.paintsService.create(createPaintDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Список всех цветов покраски',
    type: ApiDataListResponse(Paint),
  })
  findAll() {
    return this.paintsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Информация о цвете покраски',
    type: ApiDataResponse(Paint),
  })
  @ApiNotFoundResponse({
    description: 'Цвет покраски не найден',
    type: ApiErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'id должен быть числом',
    type: ApiErrorResponse,
  })
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.paintsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Цвет покраски успешно обновлён',
    type: ApiDataResponse(Paint),
  })
  @ApiNotFoundResponse({
    description: 'Цвет покраски не найден',
    type: ApiErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'id должен быть числом или ошибка валидации',
    type: ApiValidationErrorResponse,
  })
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updatePaintDto: UpdatePaintDto,
  ) {
    return this.paintsService.update(id, updatePaintDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Цвет покраски успешно удалён' })
  @ApiNotFoundResponse({
    description: 'Цвет покраски не найден',
    type: ApiErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'id должен быть числом',
    type: ApiErrorResponse,
  })
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.paintsService.remove(id);
  }
}
