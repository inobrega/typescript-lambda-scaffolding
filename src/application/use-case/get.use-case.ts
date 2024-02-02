import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUseCase {
  async execute(data: any): Promise<any> {
    let result: any;
    if (data.id) {
      result = data;
    } else {
      result = [data];
    }
    return Promise.resolve(result);
  }
}
