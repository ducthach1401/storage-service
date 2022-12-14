import { PageList } from 'src/core/models/page-list';
import { PaginationParams } from 'src/core/models/pagination-params';
import { FileModel } from '../models/file-model';

export abstract class StorageRepository {
  abstract list(
    search: string | undefined,
    paginationParams: PaginationParams,
  ): Promise<PageList<FileModel>>;

  abstract upload(name: string, filePath: string, path: string): Promise<void>;

  abstract delete(name: string): Promise<void>;
}
