import { Inject, Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { LambdaFunctionURLEvent } from 'aws-lambda';
import HttpException from '@/app/src/shared/exceptions/HttpException';
import { CreateUseCase } from '@/app/src/application/use-cases/create.use-case';
import { GetUseCase } from '@/app/src/application/use-cases/get.use-case';
import { PatchUseCase } from '@/app/src/application/use-cases/patch.use-case';
import { DeleteUseCase } from '@/app/src/application/use-cases/delete.use-case';
import { IDataEventParam } from '@/app/src/application/interfaces/IDataEventParam';

@Injectable()
export class RouterService {
  constructor(
    private createUseCase: CreateUseCase,
    private getUseCase: GetUseCase,
    private patchUseCase: PatchUseCase,
    private deleteUseCase: DeleteUseCase,
  ) {
    console.log('router-service-di');
  }

  async handleRequest(event: LambdaFunctionURLEvent): Promise<any> {
    const { method: httpMethod } = event.requestContext.http;
    const data: IDataEventParam = {
      body: JSON.parse(event.body),
      query: event.queryStringParameters,
    };

    switch (httpMethod) {
      case 'POST': {
        console.log('chegou no post :', JSON.stringify(data));
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
