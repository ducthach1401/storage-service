import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginUsecase } from 'src/modules/auth/domain/usecases/login-usecase';
import { Public } from '../../decorators/metadata';
import { AuthDto } from '../dtos/auth-dto';
import { normalizeResponseData } from 'src/core/helpers/utils';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly loginUsecase: LoginUsecase) {}

  @Public()
  @Post('login')
  async login(@Body() body: AuthDto, @Res() res: Response) {
    const token = await this.loginUsecase.call(
      body.client_id,
      body.client_secret,
    );
    res.status(HttpStatus.OK).json(normalizeResponseData(token));
  }
}
