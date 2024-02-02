import { Inject, Injectable } from '@nestjs/common';
import { LambdaFunctionURLEvent } from 'aws-lambda';
import { RouterService } from '@/app/src/shared/services/router.service';

@Injectable()
export class FunctionService {
  @Inject()
  private readonly routerService: RouterService;
  async dispatch(event: LambdaFunctionURLEvent): Promise<any> {
    // TODO Add some logic here, like FeatureFlag
    return this.routerService.routerInception(event);
  }
}
