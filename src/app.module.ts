import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { RegistrationsModule } from './registrations/registrations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    EventsModule,
    FeedbacksModule,
    RegistrationsModule,
  ],
})
export class AppModule {}
