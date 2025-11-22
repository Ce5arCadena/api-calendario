import { WeekDay } from "../dtos/create-subject.dto";
import { User } from "../../users/entities/user.entity";
import { Schedule } from "../../schedules/entities/schedule.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'json' })
    weekDays: WeekDay[];

    @Column()
    nameTeacher: string;

    @Column({ type: 'json'})
    materials: string[];

    @ManyToOne(() => User, user => user.subjects, { eager: true })
    user: User;

    @OneToMany(() => Schedule, schedule => schedule.subject, { cascade: true })
    schedules: Schedule[];
}