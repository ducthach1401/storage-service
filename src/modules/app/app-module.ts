import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import app from 'src/config/app';
import { StorageModule } from '../storage/storage-module';
import { AppController } from './app-controller';
import { AppService } from './app-service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app],
    }),
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
