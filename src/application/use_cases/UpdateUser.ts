import { User } from '../../domain/entities/User';
import { IUserService } from '../interfaces/IUserService';

class UpdateUser {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async execute(id: string, user: User) {
    return this.userService.updateUser(id, user);
  }
}

export { UpdateUser };
