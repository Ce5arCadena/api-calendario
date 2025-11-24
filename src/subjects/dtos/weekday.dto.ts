import { IsString, IsIn, Matches, IsOptional } from 'class-validator';

export class WeekDayDto {
    @IsString({message: 'El día de la semana debe ser un string'})
    @IsIn(['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'], {
        message: 'El día debe ser un valor válido (Lunes-Domingo)',
    })
    day: string;

    @IsString({message: 'La hora de inicio debe ser un string'})
    @Matches(/^\d{2}:\d{2}$/, {
        message: 'La hora de inicio debe tener el formato HH:MM',
    })
    startTime: string;

    @IsString({message: 'La hora de fin debe ser un string'})
    @Matches(/^\d{2}:\d{2}$/, {
        message: 'La hora de fin debe tener el formato HH:MM',
    })
    endTime: string;

    @IsOptional()
    @IsString()
    classroom?: string;
}