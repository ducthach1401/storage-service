import { IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  client_id!: string;

  @IsString()
  client_secret!: string;
}
