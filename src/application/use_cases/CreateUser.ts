import { User } from '../../domain/entities/User';
import { IUserService } from '../interfaces/IUserService';
import logger from '@/app/src/shared/utilities/logger';
class CreateUser {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async execute(user: User): Promise<User> {
    logger.info('Criando usuário', user);
    const createdUser = await this.userService.createUser(user);
    logger.info('Usuário criado com sucesso', createdUser);
    return createdUser;
  }
}

export { CreateUser };
