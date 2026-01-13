import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventsService } from './service/events.service';
import { EventsController } from './controller/events.controller';
import { RegistrationsModule } from '../registrations/registrations.module';
import { FeedbacksModule } from '../feedbacks/feedbacks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    RegistrationsModule,
    forwardRef(() => FeedbacksModule),
  ],
  providers: [EventsService],
  controllers: [EventsController],
  exports: [TypeOrmModule, EventsService],
})
export class EventsModule {}
