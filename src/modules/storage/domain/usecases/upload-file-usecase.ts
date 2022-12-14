import { Injectable } from '@nestjs/common';
import { StorageRepository } from '../repositories/storage-repository';

@Injectable()
export class UploadFileUsecase {
  constructor(private readonly storageRepository: StorageRepository) {}

  async call(name: string, filePath: string, path: string): Promise<void> {
    await this.storageRepository.upload(name, filePath, path);
  }
}
