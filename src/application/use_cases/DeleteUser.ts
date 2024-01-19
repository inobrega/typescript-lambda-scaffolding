import { IUserService } from '../interfaces/IUserService';

class DeleteUser {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async execute(id: string) {
    return this.userService.deleteUser(id);
  }
}

export { DeleteUser };
