import { Injectable } from '@nestjs/common';
import { IUseCase } from '@/app/src/application/interfaces/IUseCase';
import { IDataEventParam } from '@/app/src/application/interfaces/IDataEventParam';

@Injectable()
export class GetUseCase implements IUseCase {
  async execute(data: IDataEventParam): Promise<any> {
    let result: any;
    if (data.query.id) {
      result = data;
    } else {
      result = [data];
    }
    return Promise.resolve(result);
  }
}
