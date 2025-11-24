import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";
import { WeekDayDto } from "./weekday.dto";

export type HourFormat = `${number}${number}:${number}${number}`;
export type Day = 'Lunes' | 'Martes' | 'Miercoles' | 'Jueves' | 'Viernes' | 'Sabado' | 'Domingo';
export type WeekDay = {
    day: Day,
    startTime: HourFormat,
    endTime: HourFormat,
    classroom?: string
}

export class CreateSubjectDto {
    @IsString()
    @IsNotEmpty({message: 'El nombre de la materia es requerido'})
    @MinLength(3, {message: 'Mínimo 3 carácteres para el nombre'})
    name: string;

    @IsArray({ message: 'Formato incorrecto para el horario.' })
    @ArrayMinSize(1, { message: 'Debe seleccionar al menos un horario' })
    @ValidateNested({ each: true, message: 'Cada valor en weekDays debe cumplir el formato' })
    @Type(() => WeekDayDto)
    weekDays: WeekDay[];

    @IsOptional()
    @IsString({message: 'Solo carácteres para el nombre del profesor'})
    @MinLength(3, {message: 'Mínimo 3 carácteres para el nombre del profesor'})
    nameTeacher?: string;

    @IsArray({ message: 'Formato incorrécto para los materiales.' })
    @IsOptional()
    @IsString({ each: true})
    materials?: string[];
}