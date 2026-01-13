export class RegistrationResponseDto {
  id: string;
  userId: string;
  eventId: string;
  createdAt: Date;

  constructor(partial: Partial<RegistrationResponseDto>) {
    Object.assign(this, partial);
  }
}
