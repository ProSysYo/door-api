import { ApiProperty } from '@nestjs/swagger';

export class Paint {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'бетон снежный' })
  name: string;

  @ApiProperty({ example: '2026-10-16T09:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-10-16T09:00:00.000Z' })
  updatedAt: Date;
}
