import { User } from '../entities/User';

interface IUserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(id: string, user: User): Promise<User | null>;
  delete(id: string): Promise<void>;
}

export { IUserRepository };
