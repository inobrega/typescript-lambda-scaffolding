import { IUserService } from '../interfaces/IUserService';

class GetUser {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async byEmail(email: string) {
    return this.userService.getUserByEmail(email);
  }

  async byId(id: string) {
    return this.userService.getUserById(id);
  }
}

export { GetUser };
