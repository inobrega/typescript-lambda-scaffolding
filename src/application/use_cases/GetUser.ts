import { IUserService } from '../interfaces/IUserService';
import { Inject } from 'typedi';

class GetUser {
  @Inject('USER_SERVICE')
  private userService: IUserService;

  async byEmail(email: string) {
    return this.userService.getUserByEmail(email);
  }

  async byId(id: string) {
    return this.userService.getUserById(id);
  }
}

export { GetUser };
