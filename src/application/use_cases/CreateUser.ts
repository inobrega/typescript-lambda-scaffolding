import { User } from '../../domain/entities/User';
import { IUserService } from '../interfaces/IUserService';
import logger from '@/app/src/shared/utilities/logger';
import { Inject } from 'typedi';
import { FeatureFlagService } from '@/app/src/shared/services/FeatureFlagsService';
import { ConfigService } from '@/app/src/shared/services/ConfigService';
class CreateUser {
  @Inject()
  private userService: IUserService;
  @Inject()
  private configService: ConfigService;
  @Inject()
  private featureFlagService: FeatureFlagService;

  async execute(user: User): Promise<User> {
    logger.info('Criando usuário', user);
    const createdUser = await this.userService.createUser(user);
    logger.info('Usuário criado com sucesso', createdUser);
    return createdUser;
  }

  private handleEnabledFlagVerification() {
    const tenant = this.configService.get('tenant');
    if (!this.featureFlagService.isEnabledForTenant('userManagement', tenant)) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Feature not enabled for this tenant. Contact support.' }),
      };
    }
  }
}

export { CreateUser };
