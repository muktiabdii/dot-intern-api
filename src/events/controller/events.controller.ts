import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { EventsService } from '../service/events.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User, UserRole } from '../../users/entities/user.entity';
import { RegistrationsService } from '../../registrations/service/registrations.service';
import { FeedbacksService } from '../../feedbacks/service/feedbacks.service';
import { CreateFeedbackDto } from '../../feedbacks/dto/create-feedback.dto';

@Controller('events')
export class EventsController {
  constructor(
    private eventsService: EventsService,
    private registrationsService: RegistrationsService,
    private feedbacksService: FeedbacksService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    const p = page ? parseInt(page, 10) : 1;
    const l = limit ? parseInt(limit, 10) : 10;
    return this.eventsService.findAll(p, l);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  async create(@Body() dto: CreateEventDto, @CurrentUser() user: User) {
    return this.eventsService.create(dto, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEventDto,
    @CurrentUser() user: User,
  ) {
    return this.eventsService.update(id, dto as any, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.eventsService.remove(id, user);
  }

  // Nested resource: registrations
  @Post(':id/registrations')
  @UseGuards(JwtAuthGuard)
  async register(@Param('id') id: string, @CurrentUser() user: User) {
    return this.registrationsService.join(user, id);
  }

  // Nested resource: feedbacks
  @Post(':id/feedbacks')
  @UseGuards(JwtAuthGuard)
  async leaveFeedback(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() dto: CreateFeedbackDto,
  ) {
    return this.feedbacksService.create(user, id, dto);
  }

  @Get(':id/feedbacks')
  async feedbacks(
    @Param('id') id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const p = page ? parseInt(page, 10) : 1;
    const l = limit ? parseInt(limit, 10) : 10;
    return this.feedbacksService.findForEvent(id, p, l);
  }
}
