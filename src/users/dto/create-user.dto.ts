import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre de usuario es requerido'})
    @MinLength(3, {message: 'Mínimo 3 carácteres en el nombre de usuario'})
    username: string;

    @IsEmail({}, {message: 'El formato del correo no es válido'})
    @IsNotEmpty({message: 'El correo es requerido'})
    email: string;

    @IsStrongPassword({}, {message: 'Mínimo una mayúscula, una mínuscula, un número y un carácter especial.'})
    @IsNotEmpty({ message: 'La contraseña es requerida'})
    password: string;
}
