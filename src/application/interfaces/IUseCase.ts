import { IDataEventParam } from '@/app/src/application/interfaces/IDataEventParam';

export interface IUseCase {
  execute(data: IDataEventParam): Promise<any>;
}
