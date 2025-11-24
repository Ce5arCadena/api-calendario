import { 
    Body, 
    Post,
    Controller, 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { PublicRoute } from './public-route-decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @PublicRoute()
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }
}
