import { DomainModel } from 'src/core/models/domain-model';

export class FileModel extends DomainModel {
  public readonly name: string;
  public readonly size: number;
  public readonly lastModified: Date;
  public readonly publicUrl: string;

  constructor(
    name: string,
    size: number,
    lastModified: Date,
    publicUrl: string,
  ) {
    super();
    this.name = name;
    this.size = size;
    this.lastModified = lastModified;
    this.publicUrl = publicUrl;
  }

  toJson(showHidden: boolean): Record<string, any> {
    return this.filterHiddenIfNeed(
      {
        name: this.name,
        size: this.size,
        last_modified: this.lastModified,
        public_url: this.publicUrl,
      },
      showHidden,
    );
  }
}
