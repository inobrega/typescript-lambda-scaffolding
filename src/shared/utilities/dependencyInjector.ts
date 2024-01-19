import 'reflect-metadata';
import { Container } from 'typedi';
import { UserRepository } from '@/app/src/infrastructure/db/UserRepository';
import { UserService } from '@/app/src/domain/services/UserService';
import { CreateUser } from '@/app/src/application/use_cases/CreateUser';
import { GetUser } from '@/app/src/application/use_cases/GetUser';
import { UpdateUser } from '@/app/src/application/use_cases/UpdateUser';
import { DeleteUser } from '@/app/src/application/use_cases/DeleteUser';
import { ConfigService } from '@/app/src/shared/services/ConfigService';
import { FeatureFlagService } from '@/app/src/shared/services/FeatureFlagsService';
import { DatabaseConnection } from '@/app/src/infrastructure/db/DatabaseConnection';

export const setupDependencies = (): void => {

  //Repos
  Container.set('USER_REPOSITORY', new UserRepository());

  //Services
  Container.set('USER_SERVICE', new UserService());
  Container.set('CONFIG_SERVICE', new ConfigService());
  Container.set('FEATURE_FLAG_SERVICE', new FeatureFlagService());

  // UseCases
  Container.set(CreateUser, new CreateUser());
  Container.set(GetUser, new GetUser());
  Container.set(UpdateUser, new UpdateUser());
  Container.set(DeleteUser, new DeleteUser());

  // Database
  Container.set(DatabaseConnection, new DatabaseConnection());
};

export default setupDependencies;
