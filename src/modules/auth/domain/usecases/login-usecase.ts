import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import ms, { StringValue } from 'ms';
import { AuthException } from 'src/exceptions/auth-exception';
import { ErrorCode } from 'src/exceptions/error-code';
import { throwError } from '../../../../core/helpers/utils';
import { TokenModel } from '../model/token-model';

@Injectable()
export class LoginUsecase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async call(clientId: string, clientSecret: string): Promise<TokenModel> {
    if (clientId != this.configService.get<string>('auth.client.id')) {
      throw new AuthException(
        ErrorCode.AUTH_SERVICE_ERROR,
        'Client not found',
        undefined,
        undefined,
      );
    }

    if (clientSecret !== this.configService.get<string>('auth.client.secret')) {
      throw new AuthException(
        ErrorCode.AUTH_SERVICE_ERROR,
        'Client secret is incorrect',
        undefined,
        undefined,
      );
    }

    const jwt = await this.jwtService.signAsync({ sub: clientId });

    return new TokenModel(
      jwt,
      'Bearer',
      Math.floor(
        ms(
          this.configService.get<StringValue>(
            'auth.jwt.signOptions.expiresIn',
          ) ?? throwError(),
        ) / 1000,
      ),
    );
  }
}
