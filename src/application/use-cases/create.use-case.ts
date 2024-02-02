import { Injectable } from '@nestjs/common';
import { IUseCase } from '@/app/src/application/interfaces/IUseCase';
import { IDataEventParam } from '@/app/src/application/interfaces/IDataEventParam';

@Injectable()
export class CreateUseCase implements IUseCase {
  constructor() {
    console.log('create-use-case-di');
  }
  async execute(data: IDataEventParam): Promise<any> {
    console.log('chegou no execute: ', data);
    return Promise.resolve(data);
  }
}
