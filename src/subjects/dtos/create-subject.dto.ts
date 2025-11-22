import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

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

    @IsArray({message: 'Formato incorrécto para el horario.'})
    @ArrayMinSize(1, {message: 'Debe seleccionar al menos un horario'})
    weekDays: WeekDay[];

    @IsOptional()
    @IsString({message: 'Solo carácteres para el nombre del profesor'})
    @MinLength(3, {message: 'Mínimo 3 carácteres para el nombre del profesor'})
    nameTeacher?: string;

    @IsArray({message: 'Formato incorrécto para los materiales.'})
    @IsOptional()
    materials?: string[];
}