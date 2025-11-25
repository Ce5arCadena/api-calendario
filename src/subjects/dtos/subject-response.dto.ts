import { WeekDay } from "./create-subject.dto";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class SubjectResponseDto {
    @Expose()
    name: string;

    @Expose()
    weekDays: WeekDay[];

    @Expose()
    nameTeacher?: string;

    @Expose()
    materials: string[];
}