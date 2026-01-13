import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRegistration } from './entities/registration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventRegistration])],
  exports: [TypeOrmModule],
})
export class RegistrationsModule {}
