import { IsOptional, IsString } from 'class-validator';
import { PaginationParamsDto } from 'src/core/dtos/pagination-params-dto';

export class GetFilesQueryDto extends PaginationParamsDto {
  @IsOptional()
  @IsString()
  search: string;
}
