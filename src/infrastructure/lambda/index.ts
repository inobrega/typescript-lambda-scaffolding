import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app/src/presentation/modules/app.module';
import { Handler, LambdaFunctionURLEvent } from 'aws-lambda';
import { INestApplicationContext } from '@nestjs/common';
import { RouterService } from '@/app/src/shared/services/router.service';
import { WinstonModule } from 'nest-winston';

let cachedApp: INestApplicationContext;

const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: WinstonModule.createLogger({}),
  });
  return app.init();
};
export const handler: Handler = async (event: LambdaFunctionURLEvent) => {
  if (!cachedApp) {
    cachedApp = await bootstrap();
  }

  try {
    const { handleRequest } = cachedApp.get(RouterService);
    const { body, ...rest } = await handleRequest(event);
    return { rest, body: JSON.stringify(body) };
  } catch (err) {
    console.log('no handler ', err);
    return {
      statusCode: err.statusCode,
      error: err.error,
      message: err.message,
      body: JSON.stringify(err.body),
    };
  }
};
