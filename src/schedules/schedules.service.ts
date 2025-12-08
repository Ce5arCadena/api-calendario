import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { ResponseDto } from 'src/utils/dto/response.dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Subject } from 'src/subjects/entities/subject.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/utils/interfaces/jwt-payload.interface';

const DAYS = { "Lunes":1, "Martes":2, "Miercoles":3, "Jueves":4, "Viernes":5, "Sabado":6, "Domingo":0 };
interface Events {
    title: string;
    start: string;
    end: string;
    description?: string;
}

@Injectable()
export class SchedulesService {
    constructor(
        @InjectRepository(Subject)
        private subjectRepository: Repository<Subject>,
        private userService: UsersService
    ) {}

    create(createScheduleDto: CreateScheduleDto) {
        return 'This action adds a new schedule';
    }

    searchDate(day: string, hour: number, minutes: number) {
        const now = new Date();
        const today = now.getDay();
        const difference = (DAYS[day] - today + 7) % 7;
        now.setDate(now.getDate() + difference);
        now.setHours(hour, minutes, 0, 0);

        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, "0");
        const d = String(now.getDate()).padStart(2, "0");
        const hh = String(now.getHours()).padStart(2, "0");
        const mm = String(now.getMinutes()).padStart(2, "0");
        const ss = String(now.getSeconds()).padStart(2, "0");

        return `${y}-${m}-${d}T${hh}:${mm}:${ss}`;
    }

    async findAll(payload: JwtPayload): Promise<ResponseDto> {
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
                    user: userAuth.data
                }
            };

            const data = await this.subjectRepository.find(conditions);
            if (data.length <= 0) {
                return {
                    message: 'No hay materias registradas.',
                    icon: 'success',
                    ok: true,
                    data: [],
                    status: HttpStatus.OK
                };
            };

            const dataForEventsCalendar = <Events[]>[];
            data.forEach((subject) => {
                const weekdayFormat = subject.weekDays.map(({day, startTime, endTime, classroom}) => {
                    const hourEnd = endTime.split(":");
                    const hourStart = startTime.split(":");
                    const end = this.searchDate(day, Number(hourEnd[0]), Number(hourEnd[1]));
                    const start = this.searchDate(day, Number(hourStart[0]), Number(hourStart[1]));
                    return {
                        start,
                        end,
                        classroom 
                    }
                });

                weekdayFormat.forEach(weekday => {
                    dataForEventsCalendar.push({
                        title: subject.name,
                        description: 'Aula: ' + weekday.classroom,
                        start: weekday.start,
                        end: weekday.end
                    });
                });
            });
            
            return {
                message: 'Calendario para esta semana',
                icon: 'success',
                ok: true,
                data: dataForEventsCalendar,
                status: HttpStatus.OK
            };
            
        } catch (error) {
            throw new HttpException({message: 'Error al obtener las materias', icon: 'error', ok: false, status: HttpStatus.INTERNAL_SERVER_ERROR }, HttpStatus.INTERNAL_SERVER_ERROR);
        };
    }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
