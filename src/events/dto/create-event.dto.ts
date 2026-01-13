/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: 'Community Meetup' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'A casual meetup about tech' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '2026-02-20T18:00:00Z' })
  @IsDateString()
  date: string;
}
