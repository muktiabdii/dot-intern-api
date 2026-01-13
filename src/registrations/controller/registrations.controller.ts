import { Controller, Post, UseGuards, Param, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RegistrationsService } from '../service/registrations.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';

@Controller('registrations')
export class RegistrationsController {
  constructor(private registrationsService: RegistrationsService) {}

  @Post('join/:eventId')
  @UseGuards(JwtAuthGuard)
  async join(@CurrentUser() user: User, @Param('eventId') eventId: string) {
    return this.registrationsService.join(user, eventId);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async myEvents(@CurrentUser() user: User) {
    return this.registrationsService.findForUser(user.id);
  }
}
