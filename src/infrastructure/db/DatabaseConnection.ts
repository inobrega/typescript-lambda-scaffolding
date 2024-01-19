// infrastructure/db/connect.ts

import mongoose from 'mongoose';
import { ConfigService } from '@/app/src/shared/services/ConfigService';
import { Inject, Service } from 'typedi';
@Service()
export class DatabaseConnection {
  @Inject()
  private configService: ConfigService;

  public async connect() {
    const dbURI = this.configService.get('database').uri;

    try {
      await mongoose.connect(dbURI, {});
      console.log('Successfully connected to the database');
    } catch (error) {
      console.log('Error connecting to the database: ', error);
    }
  }

  public async disconnect() {
    await mongoose.connection.close();
  }
}
