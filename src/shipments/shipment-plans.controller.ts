import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ShipmentPlansService } from './shipment-plans.service';
import { ShipmentPlanDto } from './dto/shipment-plan.dto';
import {
  ApiDataResponse,
  ApiErrorResponse,
  ApiValidationErrorResponse,
} from '../common/swagger/api-envelope';

class ShipmentPlanResult {
  updated: number;
  removed: number;
}

@ApiTags('shipments')
@Controller('shipments')
export class ShipmentPlansController {
  constructor(
    private readonly shipmentPlansService: ShipmentPlansService,
  ) {}

  @Post('plan')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'План подтверждён',
    type: ApiDataResponse(ShipmentPlanResult),
  })
  @ApiBadRequestResponse({
    description: 'Ошибка валидации',
    type: ApiValidationErrorResponse,
  })
  @ApiBadRequestResponse({
    description: 'Ошибка валидации данных',
    type: ApiErrorResponse,
  })
  async planShipments(@Body() dto: ShipmentPlanDto) {
    const result = await this.shipmentPlansService.planShipments(dto);
    return result;
  }
}
