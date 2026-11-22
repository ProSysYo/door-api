import { ApiProperty } from '@nestjs/swagger';

export class Order {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'ORD-123' })
  serialNumber: string;

  @ApiProperty({ example: 'D001' })
  customerCode: string;

  @ApiProperty({ example: '2026-11-22' })
  orderDate: Date;

  @ApiProperty({ example: 2 })
  doorsCount: number;

  @ApiProperty({ example: '', required: false })
  note: string;

  // Конструктив
  @ApiProperty({ example: 'Эконом' })
  model: string;

  @ApiProperty({ example: 'Стандарт' })
  frameModel: string;

  @ApiProperty({ example: 40 })
  leafThickness: number;

  @ApiProperty({ example: 2000 })
  height: number;

  @ApiProperty({ example: 860 })
  width: number;

  @ApiProperty({ example: 800, required: false, nullable: true })
  leafWidth: number | null;

  @ApiProperty({ example: 1.2 })
  leafMetalThickness: number;

  @ApiProperty({ example: 1.5 })
  frameMetalThickness: number;

  @ApiProperty({ example: '80x40x6шт' })
  jambHole: string;

  @ApiProperty({ example: '80x40x6шт' })
  ear: string;

  @ApiProperty({ example: 'Баррас' })
  hinge: string;

  @ApiProperty({ example: 'Левая' })
  hingeSide: string;

  @ApiProperty({ example: false })
  hingeCount3: boolean;

  // Замки и фурнитура
  @ApiProperty({ example: 'Гардиан' })
  mainLock: string;

  @ApiProperty({ example: 'Металл' })
  mainPad: string;

  @ApiProperty({ example: 'A-Line' })
  knob: string;

  @ApiProperty({ example: 'Ночной' })
  bolt: string;

  @ApiProperty({ example: 'Ключ/вертушка' })
  mainLockCylinder: string;

  @ApiProperty({ example: 'Гардиан 3011' })
  extraLock: string;

  @ApiProperty({ example: 'Металл' })
  extraPad: string;

  @ApiProperty({ example: 'Ключ/вертушка' })
  extraLockCylinder: string;

  // Покраска
  @ApiProperty({ example: 'Белый' })
  paint: string;

  // Отделка снаружи
  @ApiProperty({ example: 'МДФ' })
  outsideFinish: string;

  @ApiProperty({ example: 'белёный дуб' })
  outsideFoil: string;

  // Отделка внутри
  @ApiProperty({ example: 'МДФ' })
  insideFinish: string;

  @ApiProperty({ example: 'белёный дуб' })
  insideFoil: string;

  // Наличник
  @ApiProperty({ example: 'белёный дуб' })
  casingFoil: string;

  // Дополнительные элементы
  @ApiProperty({ example: false })
  streetDoor: boolean;

  @ApiProperty({ example: false })
  eccentric: boolean;

  @ApiProperty({ example: false })
  backSheet: boolean;

  @ApiProperty({ example: false })
  thermalCable: boolean;

  @ApiProperty({ example: false })
  closerReinforcement: boolean;

  @ApiProperty({ example: false })
  closer: boolean;

  @ApiProperty({ example: false })
  electromagnet: boolean;

  @ApiProperty({ example: false })
  lighting: boolean;

  @ApiProperty({ example: false })
  soundproofing: boolean;

  // Упаковка и стоимость
  @ApiProperty({ example: 'Упаковка Софт' })
  packaging: string;

  @ApiProperty({ example: 45000 })
  price: number;

  @ApiProperty({ example: '2026-10-16T09:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-10-16T09:00:00.000Z' })
  updatedAt: Date;
}
