import { Injectable } from '@nestjs/common';
import { LambdaFunctionURLEvent } from 'aws-lambda';
import { RouterService } from '@/app/src/shared/services/router.service';

@Injectable()
export class FunctionService {
  constructor(private routerService: RouterService) {}
  async dispatch(event: LambdaFunctionURLEvent): Promise<any> {
    console.log(
      'chegou no function service, dispatch :',
      JSON.stringify(event),
    );
    // TODO Add some logic here, like FeatureFlag
    return this.routerService.handleRequest(event);
  }
}
