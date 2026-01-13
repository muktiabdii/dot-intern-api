import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventRegistration } from '../entities/registration.entity';
import { User } from '../../users/entities/user.entity';
import { EventsService } from '../../events/service/events.service';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(EventRegistration) private repo: Repository<EventRegistration>,
    private eventsService: EventsService,
  ) {}

  async join(user: User, eventId: string) {
    const event = await this.eventsService.findOne(eventId);
    if (!event) throw new NotFoundException('Event not found');

    const existing = await this.repo.findOne({ where: { user: { id: user.id }, event: { id: eventId } } });
    if (existing) throw new BadRequestException('Already registered');

    const reg = this.repo.create({ user, event });
    const saved = await this.repo.save(reg);
    // remove sensitive fields
    if (saved.user && (saved.user as any).password) delete (saved.user as any).password;
    if (saved.event && saved.event.organizer && (saved.event.organizer as any).password) delete (saved.event.organizer as any).password;
    return saved;
  }

  async findForUser(userId: string) {
    const items = await this.repo.find({ where: { user: { id: userId } }, relations: ['event', 'event.organizer'] });
    items.forEach((r) => {
      if (r.event && r.event.organizer && (r.event.organizer as any).password) delete (r.event.organizer as any).password;
    });
    // return only events the user joined
    return items.map((r) => r.event);
  }
}
