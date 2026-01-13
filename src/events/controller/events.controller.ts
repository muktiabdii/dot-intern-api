import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EventsService } from '../service/events.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User, UserRole } from '../../users/entities/user.entity';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  async create(@Body() dto: CreateEventDto, @CurrentUser() user: User) {
    return this.eventsService.create(dto, user);
  }
}
