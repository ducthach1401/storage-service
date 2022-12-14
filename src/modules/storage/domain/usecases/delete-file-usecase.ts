import { Injectable } from '@nestjs/common';
import { StorageRepository } from '../repositories/storage-repository';

@Injectable()
export class DeleteFileUsecase {
  constructor(private readonly storageRepository: StorageRepository) {}

  async call(name: string): Promise<void> {
    await this.storageRepository.delete(name);
  }
}
