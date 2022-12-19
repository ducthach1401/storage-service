import { Injectable } from '@nestjs/common';
import { PaginationParams } from 'src/core/models/pagination-params';
import { Client } from 'minio';
import { ConfigService } from '@nestjs/config';
import { throwError } from 'src/core/helpers/utils';
import { FileModel } from '../../domain/models/file-model';
import { PageList } from 'src/core/models/page-list';
import { createReadStream } from 'fs';

@Injectable()
export class StorageService {
  private readonly s3Client: Client;
  private readonly bucket: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new Client({
      endPoint:
        configService.get<string>('storage.s3.endPoint') ?? throwError(),
      accessKey:
        configService.get<string>('storage.s3.accessKey') ?? throwError(),
      secretKey:
        configService.get<string>('storage.s3.secretKey') ?? throwError(),
      port:
        Number(configService.get<number>('storage.s3.port')) ?? throwError(),
      useSSL: false,
    });

    this.bucket = this.configService.get<string>('storage.s3.bucket');
  }

  private publicUrl(name: string): string {
    return `${this.configService.get<string>('storage.s3.publicUrl')}/${
      this.bucket
    }/${encodeURI(name)}`;
  }

  async list(
    search: string | undefined,
    paginationParams: PaginationParams,
  ): Promise<PageList<FileModel>> {
    const object = this.s3Client.listObjects(this.bucket, search, true);
    const items = (await new Promise((resolve) => {
      const data = [];

      object.on('data', (item) => {
        data.push(
          new FileModel(
            item.name,
            item.size,
            new Date(item.lastModified),
            this.publicUrl(item.name),
          ),
        );
      });

      object.on('end', () => {
        resolve(data);
      });
    })) as FileModel[];

    items.sort((a, b) => {
      return b.lastModified.getTime() - a.lastModified.getTime();
    });

    return new PageList(
      paginationParams.page,
      items.length,
      items.slice(
        (paginationParams.page - 1) * paginationParams.limit,
        (paginationParams.page - 1) * paginationParams.limit +
          paginationParams.limit,
      ),
    );
  }

  async upload(
    file: Express.Multer.File,
    path: string,
  ): Promise<Record<string, any>> {
    const stream = createReadStream(file.path);
    const pathUpload = `${path}/${file.originalname}`;
    await this.s3Client.putObject(this.bucket, pathUpload, stream, {
      'Content-Type': file.mimetype,
    });
    return {
      public_url: this.publicUrl(pathUpload),
    };
  }

  async delete(name: string): Promise<void> {
    await this.s3Client.removeObject(this.bucket, name);
  }
}
