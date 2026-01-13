import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { EventRegistration } from '../../registrations/entities/registration.entity';
import { Feedback } from '../../feedbacks/entities/feedback.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.events, { onDelete: 'CASCADE' })
  organizer: User;

  @OneToMany(() => EventRegistration, (reg) => reg.event)
  registrations: EventRegistration[];

  @OneToMany(() => Feedback, (feedback) => feedback.event)
  feedbacks: Feedback[];

  @CreateDateColumn()
  createdAt: Date;
}
