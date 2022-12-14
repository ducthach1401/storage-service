import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtStrategy } from './app/jwt/jwt-strategy';
import { AuthController } from './app/http/controllers/auth-controller';
import { LoginUsecase } from './domain/usecases/login-usecase';
import auth from './config/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [auth],
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): any =>
        configService.get<JwtModuleOptions>('auth.jwt'),
    }),
  ],
  providers: [JwtStrategy, LoginUsecase],
  controllers: [AuthController],
})
export class AuthModule {}
