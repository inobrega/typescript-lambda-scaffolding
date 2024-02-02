import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app/src/presentation/modules/app.module';
import { FunctionService } from '@/app/src/shared/services/function.service';
import { Handler, LambdaFunctionURLEvent } from 'aws-lambda';
import { INestApplicationContext } from '@nestjs/common';

let cachedApp: INestApplicationContext;
export const handler: Handler = async (event: LambdaFunctionURLEvent) => {
  if (!cachedApp) {
    cachedApp = await NestFactory.createApplicationContext(AppModule);
  }

  try {
    const { dispatch } = cachedApp.get(FunctionService);
    const { body, ...rest } = await dispatch(event);
    return { rest, body: JSON.stringify(body) };
  } catch (err) {
    return {
      statusCode: err.statusCode,
      error: err.error,
      message: err.message,
      body: JSON.stringify(err.body),
    };
  }
};
