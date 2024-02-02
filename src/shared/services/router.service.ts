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
  async routerInception(event: LambdaFunctionURLEvent): Promise<any> {
    const { method: httpMethod } = event.requestContext.http;
    const data = {
      body: JSON.parse(event.body),
      ...event.queryStringParameters,
    };

    switch (httpMethod) {
      case 'POST': {
        return {
          statusCode: 201,
          message: 'Data has been created successfully.',
          body: JSON.stringify(await this.createUseCase.execute(data)),
        };
      }

      case 'GET': {
        return {
          statusCode: 200,
          message: 'Data has been retrieved successfully.',
          body: JSON.stringify(await this.getUseCase.execute(data)),
        };
      }

      case 'PUT': {
        return {
          statusCode: 200,
          message: 'Data has been updated successfully.',
          body: JSON.stringify(await this.patchUseCase.execute(data)),
        };
      }

      case 'DELETE': {
        await this.deleteUseCase.execute(data);
        return {
          statusCode: 204,
          message: 'Data has been removed successfully.',
          body: '',
        };
      }

      default:
        throw new HttpException('Method Not Allowed', 405, {
          error: true,
        });
    }
  }
}
