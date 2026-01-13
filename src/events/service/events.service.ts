import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { CreateEventDto } from '../dto/create-event.dto';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event) private repo: Repository<Event>) {}

  async create(dto: CreateEventDto, organizer: User) {
    const event = this.repo.create({
      title: dto.title,
      description: dto.description,
      date: new Date(dto.date),
      organizer,
    });
    const saved = await this.repo.save(event);
    if (saved.organizer && (saved.organizer as any).password) {
      // remove password before returning
      delete (saved.organizer as any).password;
    }
    return saved;
  }

  // optional: add listing methods
  findAll() {
    return this.repo.find({ relations: ['organizer', 'registrations', 'feedbacks'] });
  }
}
