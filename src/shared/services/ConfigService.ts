import { Service } from 'typedi';
import dotenv from 'dotenv';

dotenv.config();

@Service()
export class ConfigService {
  private database = {
    uri: process.env.DATABASE_URI || 'mongodb://localhost:27017/app',
  };

  private tenant!: string;

  get(param: string) {
    return (this as any)[param];
  }

  set(param: string, value: string) {
    (this as any)[param] = value;
  }
}
