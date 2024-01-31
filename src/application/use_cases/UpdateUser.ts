import { User } from '../../domain/entities/User';
import { IUserService } from '../interfaces/IUserService';
import { Inject } from 'typedi';

class UpdateUser {
  @Inject('USER_SERVICE')
  private userService!: IUserService;

  async execute(id: string, user: User) {
    return this.userService.updateUser(id, user);
  }
}

export { UpdateUser };
