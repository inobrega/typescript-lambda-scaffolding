import { User } from '../entities/User';
import { IUserRepository } from '@/app/src/domain/interfaces/IUserRepository';
import logger from '@/app/src/shared/utilities/logger';
import UserNotFoundException from '@/app/src/shared/exceptions/UserNotFoundException';
import { Inject, Service } from 'typedi';

@Service()
class UserService {
  @Inject('USER_REPOSITORY')
  private userRepository: IUserRepository;

  async createUser(user: User): Promise<User> {
    try {
      return this.userRepository.create(user);
    } catch (err) {
      logger.error('UserService error: createUser', err);
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      return this.userRepository.findByEmail(email);
    } catch (err) {
      logger.error('UserService error: findByEmail', err);
    }
  }

  async getUserById(id: string): Promise<User | null> {
    const user = this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  async updateUser(id: string, user: User): Promise<User | null> {
    try {
      return this.userRepository.update(id, user);
    } catch (err) {
      logger.error('UserService error: update', err);
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      return this.userRepository.delete(id);
    } catch (err) {
      logger.error('UserService error: delete', err);
    }
  }
}

export { UserService };
