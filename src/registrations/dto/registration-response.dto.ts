import { ApiProperty } from '@nestjs/swagger';

/* eslint-disable @typescript-eslint/no-unsafe-call */
export class RegistrationResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  eventId: string;

  @ApiProperty()
  createdAt: Date;

  constructor(partial: Partial<RegistrationResponseDto>) {
    Object.assign(this, partial);
  }
}
