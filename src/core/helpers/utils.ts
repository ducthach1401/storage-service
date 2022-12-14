import { PageList } from '../models/page-list';
import { DomainModel } from '../models/domain-model';
import { promises as fs } from 'fs';
import { join } from 'path';

export function throwError(errorMessage = ''): never {
  throw new Error(errorMessage);
}

export const parseBoolean = (
  val: string | boolean | number | undefined,
  strict = true,
): any => {
  if ((val === undefined || val === null) && !strict) {
    return val;
  }
  const s = val && val.toString().toLowerCase().trim();
  return s == 'true' || s == '1';
};

export const normalizeResponseData = (result: any, showHidden = false): any => {
  let data: any = result;
  if (result instanceof PageList) {
    data = result.data.map((model) => model.toJson(showHidden));
  } else if (result instanceof DomainModel) {
    data = result.toJson(showHidden);
  } else if (Array.isArray(result)) {
    data = result.map((item) => {
      if (item instanceof DomainModel) {
        return item.toJson(showHidden);
      }
      return item;
    });
  }
  return data ?? null;
};

export const readJsonFile = async (fileName: string): Promise<any> => {
  const data = await fs.readFile(join(process.cwd(), fileName));
  const stringData = data.toString();
  return JSON.parse(stringData);
};
