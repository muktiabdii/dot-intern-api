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
  async findAll() {
    const items = await this.repo.find({
      relations: ['organizer', 'registrations', 'feedbacks'],
    });
    items.forEach((item) => {
      if (item.organizer && (item.organizer as any).password)
        delete (item.organizer as any).password;
    });
    return items;
  }

  async findOne(id: string) {
    const item = await this.repo.findOne({
      where: { id },
      relations: ['organizer', 'registrations', 'feedbacks'],
    });
    if (item && item.organizer && (item.organizer as any).password)
      delete (item.organizer as any).password;
    return item;
  }

  async update(id: string, partial: Partial<CreateEventDto>, user: User) {
    const event = await this.findOne(id);
    if (!event)
      throw new (require('@nestjs/common').NotFoundException)(
        'Event not found',
      );
    // only organizer who owns the event can update
    if (!event.organizer || event.organizer.id !== user.id)
      throw new (require('@nestjs/common').ForbiddenException)(
        'Not authorized',
      );

    if (partial.title !== undefined) event.title = partial.title;
    if (partial.description !== undefined)
      event.description = partial.description;
    if (partial.date !== undefined) event.date = new Date(partial.date);

    const saved = await this.repo.save(event);
    if (saved.organizer && (saved.organizer as any).password)
      delete (saved.organizer as any).password;
    return saved;
  }

  async remove(id: string, user: User) {
    const event = await this.findOne(id);
    if (!event)
      throw new (require('@nestjs/common').NotFoundException)(
        'Event not found',
      );
    if (!event.organizer || event.organizer.id !== user.id)
      throw new (require('@nestjs/common').ForbiddenException)(
        'Not authorized',
      );

    await this.repo.remove(event);
    return { success: true };
  }
}
