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
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
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
import { Order } from './entities/order.entity';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Запись создана',
    type: ApiDataResponse(Order),
  })
  @ApiBadRequestResponse({
    description: 'Ошибка валидации',
    type: ApiValidationErrorResponse,
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Список всех',
    type: ApiDataListResponse(Order),
  })
  findAll(@Query('shipmentDate') shipmentDate?: string) {
    return this.ordersService.findAll(shipmentDate);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Информация',
    type: ApiDataResponse(Order),
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
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Успешно',
    type: ApiDataResponse(Order),
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
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
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
    return this.ordersService.remove(+id);
  }
}
