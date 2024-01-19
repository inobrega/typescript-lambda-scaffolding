import * as winston from 'winston';
import { ElasticsearchTransport, ElasticsearchTransportOptions } from 'winston-elasticsearch';

const esTransportOpts: ElasticsearchTransportOptions = {
  level: 'info',
  clientOpts: {
    node: 'http://localhost:9200',
    // opções do client Elasticsearch
  },
  indexPrefix: 'log-'
};

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new ElasticsearchTransport(esTransportOpts)
  ],
});

export default logger;
