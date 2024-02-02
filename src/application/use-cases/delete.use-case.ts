import { Injectable } from '@nestjs/common';
import { IUseCase } from '@/app/src/application/interfaces/IUseCase';
import { IDataEventParam } from '@/app/src/application/interfaces/IDataEventParam';

@Injectable()
export class DeleteUseCase implements IUseCase {
  async execute(data: IDataEventParam): Promise<any> {
    return Promise.resolve(data);
  }
}
