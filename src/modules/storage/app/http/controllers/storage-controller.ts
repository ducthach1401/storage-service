import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { normalizeResponseData } from 'src/core/helpers/utils';
import { PaginationParams } from 'src/core/models/pagination-params';
import { DeleteFileUsecase } from 'src/modules/storage/domain/usecases/delete-file-usecase';
import { GetFilesUsecase } from 'src/modules/storage/domain/usecases/get-files-usecase';
import { UploadFileUsecase } from 'src/modules/storage/domain/usecases/upload-file-usecase';
import { GetFilesQueryDto, UploadFileBodyDto } from '../../dtos/storage-dto';

@Controller('api/v1/storage')
export class StorageController {
  constructor(
    private readonly getFilesUsecase: GetFilesUsecase,
    private readonly uploadFileUsecase: UploadFileUsecase,
    private readonly deleteFileUsecase: DeleteFileUsecase,
  ) {}

  @Get()
  async getFiles(@Query() query: GetFilesQueryDto, @Res() res: Response) {
    const files = await this.getFilesUsecase.call(
      query.search,
      new PaginationParams(
        query.page,
        query.limit,
        query.need_total_count,
        query.only_count,
      ),
    );

    if (files.totalCount != undefined) {
      res.setHeader('X-Total-Count', files.totalCount);
    }
    res.json(normalizeResponseData(files));
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadFileBodyDto,
    @Res() res: Response,
  ) {
    await this.uploadFileUsecase.call(file, body.path);
    res.json(normalizeResponseData(true));
  }

  @Delete('file/name/:name')
  async deleteFile(@Param() params: any, @Res() res: Response) {
    await this.deleteFileUsecase.call(params.name);
    res.json(normalizeResponseData(true));
  }
}
