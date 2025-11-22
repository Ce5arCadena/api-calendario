import { Exclude, Expose } from "class-transformer";

export class UserResponseDto {
    username: string;
    email: string;
    password: string;
}
