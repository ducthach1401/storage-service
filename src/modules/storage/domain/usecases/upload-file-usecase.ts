import { Injectable } from '@nestjs/common';
import { StorageRepository } from '../repositories/storage-repository';

@Injectable()
export class UploadFileUsecase {
  constructor(private readonly storageRepository: StorageRepository) {}

  async call(file: Express.Multer.File, path: string): Promise<void> {
    await this.storageRepository.upload(file, path);
  }
}
