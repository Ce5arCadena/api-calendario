import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class SignInDto {
    @IsEmail({}, {message: 'El correo es incorrecto.'})
    @IsNotEmpty({message: 'El correo es requerido'})
    email: string;

    @IsStrongPassword({}, {message: 'Mínimo una mayúscula, una mínuscula, un número y un carácter especial.'})
    @IsNotEmpty({ message: 'La contraseña es requerida'})
    password: string;
}

export class PayloadJwt {
    emailUser: string;
    username: string;
}