import { User } from '../../domain/entities/User';

interface IUserService {
  createUser(user: User): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  updateUser(id: string, user: User): Promise<User | null>;
  deleteUser(id: string): Promise<void>;
}

export { IUserService };
