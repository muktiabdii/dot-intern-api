import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRegistration } from './entities/registration.entity';
import { RegistrationsService } from './service/registrations.service';
import { RegistrationsController } from './controller/registrations.controller';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventRegistration]),
    forwardRef(() => EventsModule),
  ],
  providers: [RegistrationsService],
  controllers: [RegistrationsController],
  exports: [TypeOrmModule, RegistrationsService],
})
export class RegistrationsModule {}
