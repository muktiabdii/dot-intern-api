/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Controller, Delete, UseGuards, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { FeedbacksService } from '../service/feedbacks.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';

@ApiTags('Feedbacks')
@Controller('feedbacks')
export class FeedbacksController {
  constructor(private feedbacksService: FeedbacksService) {}

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Delete feedback',
    description: 'Organizer can delete feedback left on their event',
  })
  @ApiParam({ name: 'id', description: 'Feedback id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: 'Feedback deleted' })
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.feedbacksService.remove(id, user);
  }
}
