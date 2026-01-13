/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEventDto {
  @ApiPropertyOptional({ example: 'Community Meetup' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'A casual meetup about tech' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '2026-02-20T18:00:00Z' })
  @IsOptional()
  @IsDateString()
  date?: string;
}
