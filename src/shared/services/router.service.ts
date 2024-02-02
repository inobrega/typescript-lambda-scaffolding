import { Inject, Injectable } from '@nestjs/common';
import { LambdaFunctionURLEvent } from 'aws-lambda';
import { CreateUseCase } from '@/app/src/application/use-case/create.use-case';
import { GetUseCase } from '@/app/src/application/use-case/get.use-case';
import { PatchUseCase } from '@/app/src/application/use-case/patch.use-case';
import { DeleteUseCase } from '@/app/src/application/use-case/delete.use-case';
import HttpException from '@/app/src/shared/exceptions/HttpException';

@Injectable()
export class RouterService {
  @Inject()
  private readonly createUseCase: CreateUseCase;
  @Inject()
  private readonly getUseCase: GetUseCase;
  @Inject()
  private readonly patchUseCase: PatchUseCase;
  @Inject()
  private readonly deleteUseCase: DeleteUseCase;

  private async handleUseCase(
    useCase: any,
    data: any,
    message: string,
    statusCode: number,
  ) {
    return {
      statusCode,
      message,
      body: JSON.stringify(await useCase.execute(data)),
    };
  }

  async handleRequest(event: LambdaFunctionURLEvent): Promise<any> {
    const { method: httpMethod } = event.requestContext.http;
    const data = {
      body: JSON.parse(event.body),
      ...event.queryStringParameters,
    };

    let result: any;

    switch (httpMethod) {
      case 'POST':
        result = this.handleUseCase(
          this.createUseCase,
          data,
          'Data has been created successfully.',
          201,
        );
        break;
      case 'GET':
        result = this.handleUseCase(
          this.getUseCase,
          data,
          'Data has been retrieved successfully.',
          200,
        );
        break;
      case 'PUT':
        result = this.handleUseCase(
          this.patchUseCase,
          data,
          'Data has been updated successfully.',
          200,
        );
        break;
      case 'DELETE':
        await this.deleteUseCase.execute(data);
        result = {
          statusCode: 204,
          message: 'Data has been removed successfully.',
          body: '',
        };
        break;
      default:
        throw new HttpException('Method Not Allowed', 405, {
          error: true,
        });
    }

    return result;
  }
}
