import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUseCase {
  async execute(data: any): Promise<any> {
    return Promise.resolve(data);
  }
}
