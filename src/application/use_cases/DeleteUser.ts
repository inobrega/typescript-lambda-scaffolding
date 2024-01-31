import { IUserService } from '../interfaces/IUserService';
import { Inject } from 'typedi';

class DeleteUser {
  @Inject('USER_SERVICE')
  private userService!: IUserService;

  async execute(id: string) {
    return this.userService.deleteUser(id);
  }
}

export { DeleteUser };
