import { Injectable } from '@nestjs/common';
import { PageList } from 'src/core/models/page-list';
import { PaginationParams } from 'src/core/models/pagination-params';
import { FileModel } from '../../domain/models/file-model';
import { StorageRepository } from '../../domain/repositories/storage-repository';
import { StorageService } from '../services/storage-service';

@Injectable()
export class StorageRepositoryImpl extends StorageRepository {
  constructor(private readonly storageService: StorageService) {
    super();
  }

  async list(
    search: string | undefined,
    paginationParams: PaginationParams,
  ): Promise<PageList<FileModel>> {
    return await this.storageService.list(search, paginationParams);
  }

  async upload(
    file: Express.Multer.File,
    path: string,
  ): Promise<Record<string, any>> {
    return await this.storageService.upload(file, path);
  }

  async delete(name: string): Promise<void> {
    return await this.storageService.delete(name);
  }
}
