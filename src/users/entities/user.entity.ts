import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { EventRegistration } from '../../registrations/entities/registration.entity';
import { Feedback } from '../../feedbacks/entities/feedback.entity';

export enum UserRole {
  USER = 'user',
  ORGANIZER = 'organizer',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Event, (event) => event.organizer)
  events: Event[];

  @OneToMany(() => EventRegistration, (reg) => reg.user)
  registrations: EventRegistration[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks: Feedback[];

  @CreateDateColumn()
  createdAt: Date;
}
