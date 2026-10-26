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

import {
  ApiDataListResponse,
  ApiDataResponse,
  ApiErrorResponse,
  ApiValidationErrorResponse,
} from '../common/swagger/api-envelope';

import { PackagingsService } from './packagings.service';
import { Packaging } from './entities/packaging.entity';
import { CreatePackagingDto } from './dto/create-packaging';
import { UpdatePackagingDto } from './dto/update-packaging';

@ApiTags('packagings')
@Controller('packagings')
export class PackagingsController {
  constructor(private readonly packagingsService: PackagingsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Запись создана',
    type: ApiDataResponse(Packaging),
  })
  @ApiBadRequestResponse({
    description: 'Ошибка валидации',
    type: ApiValidationErrorResponse,
  })
  create(@Body() dto: CreatePackagingDto) {
    return this.packagingsService.create(dto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Список всех',
    type: ApiDataListResponse(Packaging),
  })
  findAll() {
    return this.packagingsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Информация',
    type: ApiDataResponse(Packaging),
  })
  @ApiNotFoundResponse({
    description: 'Запись не найдена',
    type: ApiErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'id должен быть числом',
    type: ApiErrorResponse,
  })
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.packagingsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Успешно',
    type: ApiDataResponse(Packaging),
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
    @Body() updatePackagingDto: UpdatePackagingDto,
  ) {
    return this.packagingsService.update(id, updatePackagingDto);
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
    return this.packagingsService.remove(id);
  }
}
