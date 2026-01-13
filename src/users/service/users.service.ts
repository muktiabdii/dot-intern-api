import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async create(data: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
  }) {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = this.usersRepo.create({ ...data, password: hashed });
    return this.usersRepo.save(user);
  }

  findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  findById(id: string) {
    return this.usersRepo.findOne({ where: { id } });
  }

  async updateProfile(
    id: string,
    dto: Partial<{ name: string; email: string; password: string }>,
  ) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');

    if (dto.email && dto.email !== user.email) {
      const existing = await this.findByEmail(dto.email);
      if (existing && existing.id !== id)
        throw new BadRequestException('Email already in use');
      user.email = dto.email;
    }

    if (dto.name !== undefined) user.name = dto.name;
    if (dto.password !== undefined)
      user.password = await bcrypt.hash(dto.password, 10);

    const saved = await this.usersRepo.save(user);
    if ((saved as any).password) delete (saved as any).password;
    return saved;
  }
}
