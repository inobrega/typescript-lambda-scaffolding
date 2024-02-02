import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUseCase {
  async execute(data: any): Promise<any> {
    return Promise.resolve(data);
  }
}
