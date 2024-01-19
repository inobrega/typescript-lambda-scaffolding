import { User, UserModel } from '@/app/src/domain/entities/User';
import { IUserRepository } from '@/app/src/domain/interfaces/IUserRepository';
import logger from '@/app/src/shared/utilities/logger';

class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    try {
      const newUser = new UserModel(user);
      return newUser.save();
    } catch (error) {
      logger.error('UserRepository error: create', error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return UserModel.findOne({ email }).exec();
    } catch (error) {
      logger.error('UserRepository error: findOne', error);
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      return UserModel.findById(id).exec();
    } catch (error) {
      logger.error('UserRepository error: findById', error);
      throw error;
    }
  }

  async update(id: string, user: User): Promise<User | null> {
    try {
      return UserModel.findByIdAndUpdate(id, user, { new: true }).exec();
    } catch (error) {
      logger.error('UserRepository error: findByIdAndUpdate', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await UserModel.findByIdAndDelete(id).exec();
    } catch (error) {
      logger.error('UserRepository error: findByIdAndDelete', error);
      throw error;
    }
  }
}

export { UserRepository };
