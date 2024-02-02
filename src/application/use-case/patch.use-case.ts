import { Injectable } from '@nestjs/common';

@Injectable()
export class PatchUseCase {
  async execute(data: any): Promise<any> {
    return Promise.resolve(data);
  }
}
