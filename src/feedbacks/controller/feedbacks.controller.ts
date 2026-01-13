import {
  Controller,
  Post,
  UseGuards,
  Param,
  Body,
  Delete,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { FeedbacksService } from '../service/feedbacks.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private feedbacksService: FeedbacksService) {}

  @Post('event/:eventId')
  @UseGuards(JwtAuthGuard)
  async create(
    @CurrentUser() user: User,
    @Param('eventId') eventId: string,
    @Body() dto: CreateFeedbackDto,
  ) {
    return this.feedbacksService.create(user, eventId, dto);
  }

  @Get('event/:eventId')
  @UseGuards(JwtAuthGuard)
  async findForEvent(@Param('eventId') eventId: string) {
    return this.feedbacksService.findForEvent(eventId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.feedbacksService.remove(id, user);
  }
}
