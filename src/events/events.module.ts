import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventsService } from './service/events.service';
import { EventsController } from './controller/events.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventsService],
  controllers: [EventsController],
  exports: [TypeOrmModule, EventsService],
})
export class EventsModule {}
