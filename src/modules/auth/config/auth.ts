import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  client: {
    id: process.env.AUTH_CLIENT_ID,
    secret: process.env.AUTH_CLIENT_SECRET,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  },
}));
