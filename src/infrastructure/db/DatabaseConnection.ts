import mongoose from 'mongoose';
import { ConfigService } from '@/app/src/shared/services/ConfigService';
import { Inject, Service } from 'typedi';
import logger from '@/app/src/shared/utilities/logger';
@Service()
export class DatabaseConnection {
  @Inject('CONFIG_SERVICE')
  private configService!: ConfigService;

  public async connect() {
    const dbURI = this.configService.get('database').uri;

    try {
      await mongoose.connect(dbURI, {});
      logger.info('Database connected.');
    } catch (error) {
      logger.error('Error connecting to the database: ', error);
    }
  }

  public async disconnect() {
    await mongoose.connection.close();
    logger.info('Database disconnected.');
  }
}
