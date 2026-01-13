/* eslint-disable @typescript-eslint/no-unsafe-call */
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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
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

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(
    private eventsService: EventsService,
    private registrationsService: RegistrationsService,
    private feedbacksService: FeedbacksService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'List events',
    description: 'Returns a paginated list of events',
  })
  @ApiOkResponse({ description: 'Events retrieved' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    const p = page ? parseInt(page, 10) : 1;
    const l = limit ? parseInt(limit, 10) : 10;
    return this.eventsService.findAll(p, l);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Get event details',
    description: 'Get details for a single event by id',
  })
  @ApiOkResponse({ description: 'Event details returned' })
  @ApiParam({ name: 'id', description: 'Event id' })
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Create new event',
    description: 'Create a new event (organizers only)',
  })
  @ApiCreatedResponse({ description: 'Event created' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  async create(@Body() dto: CreateEventDto, @CurrentUser() user: User) {
    return this.eventsService.create(dto, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Update event',
    description: 'Update an existing event (organizers only)',
  })
  @ApiOkResponse({ description: 'Event updated' })
  @ApiParam({ name: 'id', description: 'Event id' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEventDto,
    @CurrentUser() user: User,
  ) {
    return this.eventsService.update(id, dto as Partial<CreateEventDto>, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Delete event',
    description: 'Delete an event (organizers only)',
  })
  @ApiOkResponse({ description: 'Event deleted' })
  @ApiParam({ name: 'id', description: 'Event id' })
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.eventsService.remove(id, user);
  }

  // Nested resource: registrations
  @Post(':id/registrations')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Register for event',
    description: 'Join an event as the authenticated user',
  })
  @ApiParam({ name: 'id', description: 'Event id' })
  async register(@Param('id') id: string, @CurrentUser() user: User) {
    return this.registrationsService.join(user, id);
  }

  // Nested resource: feedbacks
  @Post(':id/feedbacks')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Leave feedback',
    description: 'Leave feedback for an event (must be registered)',
  })
  @ApiParam({ name: 'id', description: 'Event id' })
  async leaveFeedback(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() dto: CreateFeedbackDto,
  ) {
    return this.feedbacksService.create(user, id, dto);
  }

  @Get(':id/feedbacks')
  @ApiOperation({
    summary: 'List feedbacks for event',
    description: 'Get paginated feedbacks for given event',
  })
  @ApiParam({ name: 'id', description: 'Event id' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiOkResponse({ description: 'Feedbacks returned' })
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
