import { 
    IsArray, 
    IsString, 
    MinLength, 
    IsNotEmpty, 
    IsOptional, 
    ArrayMinSize, 
    ValidateNested, 
} from "class-validator";
import { Type } from "class-transformer";
import { WeekDayDto } from "./weekday.dto";
import { User } from "src/users/entities/user.entity";

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

    @IsOptional()
    user?: User;

    @IsArray({ message: 'Formato incorrécto para los materiales.' })
    @IsOptional()
    @IsString({ each: true, message: "Los materiales deben ser texto"})
    materials?: string[];
}