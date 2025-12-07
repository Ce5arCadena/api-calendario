import { 
    Injectable, 
    HttpStatus, 
    HttpException, 
} from "@nestjs/common";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Subject } from "./entities/subject.entity";
import { UsersService } from "src/users/users.service";
import { ResponseDto } from "src/utils/dto/response.dto";
import { CreateSubjectDto } from "./dtos/create-subject.dto";
import { UpdateSubjectDto } from "./dtos/update-subject.dto";
import { formatHour } from "src/utils/functions/format-hour";
import { JwtPayload } from "src/utils/interfaces/jwt-payload.interface";

@Injectable()
export class SubjectService {

    constructor(
        @InjectRepository(Subject)
        private subjectRepository: Repository<Subject>,
        private userService: UsersService
    ) {}

    async getAll(page: number, limit: number, search: string, payload: JwtPayload) {
        try {
            //Obtener usuario autenticado
            const userAuth = await this.userService.findByEmail(payload.emailUser);
            if (!userAuth || !userAuth.data?.state) {
                return {
                    message: 'No tiene permiso para ejecutar esta acción.',
                    icon: 'error',
                    ok: false,
                    data: {},
                    status: HttpStatus.UNAUTHORIZED
                }
            }

            const conditions = {
                where: {
                    user: userAuth.data,
                    name: Like(`%${search}%`)
                }
            }

            const [subjects, total] = await this.subjectRepository.findAndCount({
                take: limit,
                skip: (page - 1) * limit,
                where: conditions.where
            });

            if (total <= 0) {
                return {
                    message: 'Lista de materias',
                    icon: 'success',
                    ok: true,
                    data: {
                        subjects: [],
                        total: 0
                    },
                    status: HttpStatus.NO_CONTENT,
                }    
            }

            return {
                message: 'Lista de materias',
                icon: 'success',
                ok: true,
                data: {
                    subjects: subjects,
                    total
                },
                status: HttpStatus.NO_CONTENT,
            }
        } catch (error) {
            throw new HttpException({message: 'Error al obtener las materias', icon: 'error', ok: false, status: HttpStatus.INTERNAL_SERVER_ERROR }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getSubject(id: number, payload: JwtPayload): Promise<ResponseDto>{
        try {
            //Obtener usuario autenticado
            const userAuth = await this.userService.findByEmail(payload.emailUser);
            if (!userAuth || !userAuth.data?.state) {
                return {
                    message: 'No tiene permiso para ejecutar esta acción.',
                    icon: 'error',
                    ok: false,
                    data: {},
                    status: HttpStatus.UNAUTHORIZED
                }
            }
            
            const subject = await this.subjectRepository.findOneBy({ id, user: userAuth.data});
            if (!subject) {
                return {
                    message: 'No se encontró el recurso solicitado.',
                    icon: 'error',
                    ok: false,
                    data: {},
                    status: HttpStatus.NOT_FOUND
                }
            }

            return {
                message: 'Materia encontrada',
                icon: 'success',
                ok: true,
                data: subject,
                status: HttpStatus.CREATED
            }
        } catch (error) {
            throw new HttpException({message: 'Error al obtener la materia', icon: 'error', ok: false, status: HttpStatus.INTERNAL_SERVER_ERROR }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createSubject(subject: CreateSubjectDto, payload: JwtPayload): Promise<ResponseDto> {
        try {
            //Obtener usuario autenticado
            const userAuth = await this.userService.findByEmail(payload.emailUser);
            if (!userAuth || !userAuth.data?.state) {
                return {
                    message: 'No tiene permiso para ejecutar esta acción.',
                    icon: 'error',
                    ok: false,
                    data: {},
                    status: HttpStatus.UNAUTHORIZED
                }
            }

            const existSubjectByName = await this.subjectRepository.findOneBy({name: subject.name, user: userAuth.data});
            if (existSubjectByName) {
                return {
                    message: 'Ya existe una materia con este nombre.',
                    icon: 'error',
                    ok: false,
                    data: {},
                    status: HttpStatus.CONFLICT
                }
            }

            const errorsHours: string[] = [];
            subject.weekDays.forEach(({day, startTime, endTime}) => {
                if (formatHour(endTime) <= formatHour(startTime)) {
                    errorsHours.push(`El día ${day}, la hora de fin debe ser mayor a la de inicio`);
                }
            });
            if (errorsHours.length > 0) {
                return {
                    message: 'El horario está mal formado.',
                    icon: 'error',
                    ok: false,
                    data: {},
                    erors: errorsHours,
                    status: HttpStatus.BAD_REQUEST
                }
            }

            subject.user = userAuth.data;
        
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

    async updateSubject(id: number, subject: UpdateSubjectDto, payload: JwtPayload): Promise<ResponseDto> {
        try {
            //Obtener usuario autenticado
            const userAuth = await this.userService.findByEmail(payload.emailUser);
            if (!userAuth || !userAuth.data?.state) {
                return {
                    message: 'No tiene permiso para ejecutar esta acción.',
                    icon: 'error',
                    ok: false,
                    data: {},
                    status: HttpStatus.UNAUTHORIZED
                }
            }
            const subjectFind = await this.subjectRepository.findOneBy({ id });
            if (!subjectFind) {
                return {
                    message: 'No existe la materia indicada.',
                    icon: 'error',
                    ok: false,
                    data: {},
                    status: HttpStatus.NOT_FOUND
                }
            }

            if (subject.name) {
                const nameSubjectExist = await this.subjectRepository.findOneBy({ name: subject.name });
                if (nameSubjectExist && subjectFind.id !== nameSubjectExist.id) {
                    return {
                        message: 'Ya existe una materia con este nombre.',
                        icon: 'error',
                        ok: false,
                        data: {},
                        status: HttpStatus.CONFLICT
                    }
                }
                subjectFind.name = subject.name.trim();
            }

            if (subject.weekDays) {
                const errorsHours: string[] = [];
                subject.weekDays.forEach(({day, startTime, endTime}) => {
                    if (formatHour(endTime) <= formatHour(startTime)) {
                        errorsHours.push(`El día ${day}, la hora de fin debe ser mayor a la de inicio`);
                    }
                });
                if (errorsHours.length > 0) {
                    return {
                        message: 'El horario está mal formado.',
                        icon: 'error',
                        ok: false,
                        data: {},
                        erors: errorsHours,
                        status: HttpStatus.BAD_REQUEST
                    }
                }
                subjectFind.weekDays = subject.weekDays;
            }

            if (subject.nameTeacher) subjectFind.nameTeacher = subject.nameTeacher;
            if (subject.materials) subjectFind.materials = subject.materials;
            
            const subjectUpdate = await this.subjectRepository.save({...subjectFind, user: userAuth.data});
            // Esto es para mostrar solo la materia sin el user
            // const subjectWithoutUser = plainToInstance(SubjectResponseDto, subjectUpdate);

            return {
                message: 'Materia actualizada',
                icon: 'success',
                ok: true,
                data: subjectUpdate,
                status: HttpStatus.CREATED
            }
        } catch (error) {
            console.log('*****', error)
            throw new HttpException({message: 'Error al actualizar la materia', icon: 'error', ok: false, status: HttpStatus.INTERNAL_SERVER_ERROR }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteSubject(id: number, payload: JwtPayload): Promise<ResponseDto> {
        try {
            //Obtener usuario autenticado
            const userAuth = await this.userService.findByEmail(payload.emailUser);
            if (!userAuth || !userAuth.data?.state) {
                return {
                    message: 'No tiene permiso para ejecutar esta acción.',
                    icon: 'error',
                    ok: false,
                    data: {},
                    status: HttpStatus.UNAUTHORIZED
                }
            }

            const subject = await this.subjectRepository.findOneBy({id, user: userAuth.data});
            if (!subject) {
                return {
                    message: 'No tiene permiso para ejecutar esta acción.',
                    icon: 'error',
                    ok: false,
                    data: {},
                    status: HttpStatus.NOT_FOUND
                }
            }

            await this.subjectRepository.delete(subject.id);
            return {
                message: 'Materia eliminada',
                icon: 'success',
                ok: true,
                data: {},
                status: HttpStatus.NO_CONTENT
            }
        } catch (error) {
            throw new HttpException({message: 'Error al eliminar la materia', icon: 'error', ok: false, status: HttpStatus.INTERNAL_SERVER_ERROR }, HttpStatus.INTERNAL_SERVER_ERROR);
        };
    }
}