import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Subject } from "./entities/subject.entity";

@Injectable()
export class SubjectService {

    constructor(
        @InjectRepository(Subject)
        private subjectRepository: Repository<Subject>
    ) {}

    getSubjects(): string {
        return 'Lista de materias';
    }
}