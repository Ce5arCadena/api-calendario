import { Exclude } from "class-transformer";
import { Subject } from "../../subjects/entities/subject.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Exclude({ toPlainOnly: true })
    @Column({  })
    password: string;

    @Column({ default: true })
    state?: boolean;

    @OneToMany(() => Subject, subject => subject.user)
    subjects: Subject[];
}
