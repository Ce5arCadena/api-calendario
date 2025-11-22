import { Subject } from "../../subjects/entities/subject.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import type { Day, HourFormat } from "src/subjects/dtos/create-subject.dto";

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    day: Day;

    @Column()
    startTime: HourFormat;

    @Column()
    endTime: HourFormat;

    @Column({ nullable: true })
    classroom: string;

    @ManyToOne(() => Subject, subject => subject.schedules, {eager: true})
    subject: Subject;
}
