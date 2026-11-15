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
import { PadsService } from './pads.service';
import { CreatePadDto } from './dto/create-pad.dto';
import { UpdatePadDto } from './dto/update-pad.dto';
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
import { Pad } from './entities/pad.entity';

@ApiTags('pads')
@Controller('pads')
export class PadsController {
  constructor(private readonly padsService: PadsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Запись создана',
    type: ApiDataResponse(Pad),
  })
  @ApiBadRequestResponse({
    description: 'Ошибка валидации',
    type: ApiValidationErrorResponse,
  })
  create(@Body() createPadDto: CreatePadDto) {
    return this.padsService.create(createPadDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Список всех',
    type: ApiDataListResponse(Pad),
  })
  findAll() {
    return this.padsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Информация',
    type: ApiDataResponse(Pad),
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
    return this.padsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Успешно',
    type: ApiDataResponse(Pad),
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
    @Body() updatePadDto: UpdatePadDto,
  ) {
    return this.padsService.update(id, updatePadDto);
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
    return this.padsService.remove(+id);
  }
}
