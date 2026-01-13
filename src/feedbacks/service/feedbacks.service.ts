import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from '../entities/feedback.entity';
import { User } from '../../users/entities/user.entity';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';
import { EventRegistration } from '../../registrations/entities/registration.entity';
import { EventsService } from '../../events/service/events.service';

@Injectable()
export class FeedbacksService {
  constructor(
    @InjectRepository(Feedback) private repo: Repository<Feedback>,
    @InjectRepository(EventRegistration)
    private regRepo: Repository<EventRegistration>,
    private eventsService: EventsService,
  ) {}

  async create(user: User, eventId: string, dto: CreateFeedbackDto) {
    const event = await this.eventsService.findOne(eventId);
    if (!event) throw new NotFoundException('Event not found');

    // ensure user joined the event
    const reg = await this.regRepo.findOne({
      where: { user: { id: user.id }, event: { id: eventId } },
    });
    if (!reg)
      throw new BadRequestException(
        'You must join the event to leave feedback',
      );

    const fb = this.repo.create({ content: dto.content, user, event });
    const saved = await this.repo.save(fb);
    return saved;
  }

  async remove(id: string, actor: User) {
    const fb = await this.repo.findOne({
      where: { id },
      relations: ['event', 'event.organizer'],
    });
    if (!fb) throw new NotFoundException('Feedback not found');

    if (
      !fb.event ||
      !fb.event.organizer ||
      fb.event.organizer.id !== actor.id
    ) {
      throw new ForbiddenException('Not authorized');
    }

    await this.repo.remove(fb);
    return { success: true };
  }

  async findForEvent(eventId: string, page = 1, limit = 10) {
    const take = Math.min(limit, 100);
    const skip = (Math.max(page, 1) - 1) * take;
    const [items, total] = await this.repo.findAndCount({
      where: { event: { id: eventId } },
      relations: ['user'],
      take,
      skip,
      order: { createdAt: 'DESC' },
    });
    return {
      data: items,
      meta: { total, page: Math.max(page, 1), limit: take },
    };
  }
}
