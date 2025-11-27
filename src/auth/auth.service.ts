import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { UsersService } from 'src/users/users.service';
import { ResponseDto } from 'src/utils/dto/response.dto';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(signInDto: SignInDto): Promise<ResponseDto> {
        try {
            const user = await this.usersService.findByEmail(signInDto.email, true);
            if (!user.ok) {
                return {
                    message: 'Correo y/o email incorrectos',
                    icon: 'error',
                    ok: false,
                    data: {},
                    status: HttpStatus.UNAUTHORIZED
                };
            }

            if (!user.data) {
                return {
                    message: 'Correo y/o email incorrectos',
                    icon: 'error',
                    ok: false,
                    data: {},
                    status: HttpStatus.UNAUTHORIZED
                };
            }

            const { email: emailUser, password: passwordUser, username } = user.data;
            const checkPassword = await bcrypt.compare(signInDto.password, passwordUser);
            if (!checkPassword) {
                return {
                    message: 'Correo y/o email incorrectos',
                    icon: 'error',
                    ok: false,
                    data: {},
                    status: HttpStatus.UNAUTHORIZED
                };
            }

            const payload = { emailUser: emailUser, username };
            const token = await this.jwtService.signAsync(payload);

            return {
                message: 'Login éxitoso',
                icon: 'success',
                ok: true,
                data: { username },
                token
            }
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException();
        };
    }
}
