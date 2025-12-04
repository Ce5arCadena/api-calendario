import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';

ConfigModule.forRoot({
  envFilePath: `.env`,
  isGlobal: true
});

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      secret: process.env.JWTPRIVETKEY,
      signOptions: { expiresIn: '2h'}
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
