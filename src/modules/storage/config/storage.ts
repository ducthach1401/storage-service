import { registerAs } from '@nestjs/config';

export default registerAs('storage', () => ({
  s3: {
    endPoint: process.env.S3_END_POINT,
    port: process.env.S3_PORT,
    accessKey: process.env.S3_ACCESS_KEY,
    secretKey: process.env.S3_SECRET_KEY,
    bucket: process.env.S3_BUCKET_NAME,
    publicUrl: process.env.S3_PUBLIC_URL,
  },
}));
