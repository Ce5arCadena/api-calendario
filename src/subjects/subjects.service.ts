import { 
    Injectable, 
    HttpStatus, 
    HttpException, 
} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Subject } from "./entities/subject.entity";
import { ResponseDto } from "src/utils/dto/response.dto";
import { CreateSubjectDto } from "./dtos/create-subject.dto";

@Injectable()
export class SubjectService {

    constructor(
        @InjectRepository(Subject)
        private subjectRepository: Repository<Subject>
    ) {}

    getSubjects(): string {
        return 'Lista de materias';
    }

    async createSubject(subject: CreateSubjectDto): Promise<ResponseDto> {
        try {
            const existSubjectByName = await this.subjectRepository.findOneBy({name: subject.name});
            if (existSubjectByName) {
                return {
                    message: 'Ya existe una materia con este nombre.',
                    icon: 'error',
                    ok: false,
                    data: {}
                }
            }

            const newSubject = await this.subjectRepository.save(subject);
            return {
                message: 'Materia creada.',
                icon: 'success',
                ok: true,
                data: newSubject,
                status: HttpStatus.CREATED
            }
        } catch (error) {
            console.log('*****', error)
            throw new HttpException({message: 'Error al crear la materia', icon: 'error', ok: false, status: HttpStatus.INTERNAL_SERVER_ERROR }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}