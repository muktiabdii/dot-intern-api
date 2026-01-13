import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { FeedbacksService } from './service/feedbacks.service';
import { FeedbacksController } from './controller/feedbacks.controller';
import { EventRegistration } from '../registrations/entities/registration.entity';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feedback, EventRegistration]),
    EventsModule,
  ],
  providers: [FeedbacksService],
  controllers: [FeedbacksController],
  exports: [TypeOrmModule, FeedbacksService],
})
export class FeedbacksModule {}
