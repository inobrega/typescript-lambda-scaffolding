import { User } from '../../domain/entities/User';
import { IUserService } from '../interfaces/IUserService';
import logger from '@/app/src/shared/utilities/logger';
import { Inject } from 'typedi';
import { FeatureFlagService } from '@/app/src/shared/services/FeatureFlagsService';
import { ConfigService } from '@/app/src/shared/services/ConfigService';
import FeatureNotEnabledException from '@/app/src/shared/exceptions/FeatureNotEnabledException';
class CreateUser {
  @Inject('USER_SERVICE')
  private userService!: IUserService;
  @Inject('CONFIG_SERVICE')
  private configService!: ConfigService;
  @Inject('FEATURE_FLAG_SERVICE')
  private featureFlagService!: FeatureFlagService;

  async execute(user: User): Promise<User> {
    logger.info('Creating user', user);
    this.handleEnabledFlagVerification();
    const createdUser = await this.userService.createUser(user);
    logger.info('User created successfully', createdUser);
    return createdUser;
  }

  private handleEnabledFlagVerification() {
    const tenant = this.configService.get('tenant');
    if (!this.featureFlagService.isEnabledForTenant('userManagement', tenant)) {
      logger.warn('A tenant tried to execute a feature who dont have access', tenant);
      throw new FeatureNotEnabledException();
    }
  }
}

export { CreateUser };
