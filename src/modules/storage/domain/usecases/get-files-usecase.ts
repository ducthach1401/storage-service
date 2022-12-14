import { Injectable } from '@nestjs/common';
import { PageList } from 'src/core/models/page-list';
import { PaginationParams } from 'src/core/models/pagination-params';
import { FileModel } from '../models/file-model';
import { StorageRepository } from '../repositories/storage-repository';

@Injectable()
export class GetFilesUsecase {
  constructor(private readonly storageRepository: StorageRepository) {}

  async call(
    search: string | undefined,
    paginationParams: PaginationParams,
  ): Promise<PageList<FileModel>> {
    return await this.storageRepository.list(search, paginationParams);
  }
}
