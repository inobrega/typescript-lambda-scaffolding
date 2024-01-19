import 'reflect-metadata';
import { Container } from 'typedi';
import { UserRepository } from '@/app/src/infrastructure/db/UserRepository';
import { UserService } from '@/app/src/domain/services/UserService';
import { CreateUser } from '@/app/src/application/use_cases/CreateUser';
import { GetUser } from '@/app/src/application/use_cases/GetUser';
import { UpdateUser } from '@/app/src/application/use_cases/UpdateUser';
import { DeleteUser } from '@/app/src/application/use_cases/DeleteUser';

export const setupDependencies = (): void => {

  Container.set(UserRepository, new UserRepository());

  Container.set(UserService, new UserService(Container.get(UserRepository)));

  Container.set(CreateUser, new CreateUser(Container.get(UserService)));
  Container.set(GetUser, new GetUser(Container.get(UserService)));
  Container.set(UpdateUser, new UpdateUser(Container.get(UserService)));
  Container.set(DeleteUser, new DeleteUser(Container.get(UserService)));
};

export default setupDependencies;
