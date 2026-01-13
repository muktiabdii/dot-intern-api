import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventRegistration } from '../entities/registration.entity';
import { RegistrationResponseDto } from '../dto/registration-response.dto';
import { User } from '../../users/entities/user.entity';
import { EventsService } from '../../events/service/events.service';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(EventRegistration)
    private repo: Repository<EventRegistration>,
    private eventsService: EventsService,
  ) {}

  async join(user: User, eventId: string) {
    const event = await this.eventsService.findOne(eventId);
    if (!event) throw new NotFoundException('Event not found');

    const existing = await this.repo.findOne({
      where: { user: { id: user.id }, event: { id: eventId } },
    });
    if (existing) throw new BadRequestException('Already registered');

    const reg = this.repo.create({ user, event });
    const saved = await this.repo.save(reg);
    return new RegistrationResponseDto({
      id: saved.id,
      userId: saved.user.id,
      eventId: saved.event.id,
      createdAt: saved.createdAt,
    });
  }

  async findForUser(userId: string, page = 1, limit = 10) {
    const take = Math.min(limit, 100);
    const skip = (Math.max(page, 1) - 1) * take;
    const [items, total] = await this.repo.findAndCount({
      where: { user: { id: userId } },
      relations: ['event'],
      take,
      skip,
      order: { createdAt: 'DESC' },
    });
    const data = items.map((r) => ({
      id: r.id,
      userId: r.user.id,
      eventId: r.event.id,
      createdAt: r.createdAt,
    }));
    return { data, meta: { total, page: Math.max(page, 1), limit: take } };
  }
}
