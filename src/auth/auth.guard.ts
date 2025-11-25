import { 
    Injectable,
    CanActivate, 
    HttpStatus, 
    HttpException, 
    ExecutionContext, 
} from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./public-route-decorator";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        
        if (isPublic) return true;

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if(!token) {
            throw new HttpException({
                message: 'No tiene permiso para ejecutar esta acción.',
                icon: 'error',
                ok: false,
                data: [],
                status: HttpStatus.UNAUTHORIZED
            }, HttpStatus.UNAUTHORIZED);
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWTPRIVETKEY
                }
            );
            request.user = payload;
        } catch (error) {
            throw new HttpException({
                message: 'No tiene permiso para ejecutar esta acción.',
                icon: 'error',
                ok: false,
                data: [],
                status: HttpStatus.UNAUTHORIZED
            }, HttpStatus.UNAUTHORIZED);
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}