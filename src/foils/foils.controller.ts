import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FoilsService } from './foils.service';
import { CreateFoilDto } from './dto/create-foil.dto';
import { UpdateFoilDto } from './dto/update-foil.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiDataListResponse,
  ApiDataResponse,
  ApiErrorResponse,
  ApiValidationErrorResponse,
} from '../common/swagger/api-envelope';
import { Foil } from './entities/foil.entity';

@ApiTags('foils')
@Controller('foils')
export class FoilsController {
  constructor(private readonly foilsService: FoilsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Запись создана',
    type: ApiDataResponse(Foil),
  })
  @ApiBadRequestResponse({
    description: 'Ошибка валидации',
    type: ApiValidationErrorResponse,
  })
  create(@Body() createFoilDto: CreateFoilDto) {
    return this.foilsService.create(createFoilDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Список всех',
    type: ApiDataListResponse(Foil),
  })
  findAll() {
    return this.foilsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Информация',
    type: ApiDataResponse(Foil),
  })
  @ApiNotFoundResponse({
    description: 'Запись не найдена',
    type: ApiErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'id должен быть числом',
    type: ApiErrorResponse,
  })
  findOne(@Param('id') id: string) {
    return this.foilsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Успешно',
    type: ApiDataResponse(Foil),
  })
  @ApiNotFoundResponse({
    description: 'Запись не найдена',
    type: ApiErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'id должен быть числом или ошибка валидации',
    type: ApiValidationErrorResponse,
  })
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateFoilDto: UpdateFoilDto,
  ) {
    return this.foilsService.update(id, updateFoilDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Успешно удалёно' })
  @ApiNotFoundResponse({
    description: 'Не найдено',
    type: ApiErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'id должен быть числом',
    type: ApiErrorResponse,
  })
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.foilsService.remove(+id);
  }
}
