import { DomainModel } from 'src/core/models/domain-model';

export class TokenModel extends DomainModel {
  public readonly accessToken: string;
  public readonly tokenType: string;
  public readonly expiresIn: number;

  constructor(accessToken: string, tokenType: string, expiresIn: number) {
    super();
    this.accessToken = accessToken;
    this.tokenType = tokenType;
    this.expiresIn = expiresIn;
  }

  toJson(): Record<string, any> {
    return {
      access_token: this.accessToken,
      token_type: this.tokenType,
      expires_in: this.expiresIn,
    };
  }
}
