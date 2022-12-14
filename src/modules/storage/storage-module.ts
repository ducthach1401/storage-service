import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { StorageController } from './app/http/controllers/storage-controller';
import storage from './config/storage';
import { StorageRepositoryImpl } from './data/repositories/storage-repository-impl';
import { StorageService } from './data/services/storage-service';
import { StorageRepository } from './domain/repositories/storage-repository';
import { DeleteFileUsecase } from './domain/usecases/delete-file-usecase';
import { GetFilesUsecase } from './domain/usecases/get-files-usecase';
import { UploadFileUsecase } from './domain/usecases/upload-file-usecase';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [storage],
    }),
    MulterModule.register({
      dest: '/tmp',
    }),
  ],
  controllers: [StorageController],
  providers: [
    {
      provide: StorageRepository,
      useClass: StorageRepositoryImpl,
    },
    StorageService,
    DeleteFileUsecase,
    GetFilesUsecase,
    UploadFileUsecase,
  ],
})
export class StorageModule {}
