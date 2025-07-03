import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.MONGODB_HOST || 'localhost',
  port: new Number(process.env.MONGODB_PORT) || 27017,
  database: process.env.MONGODB_DATABASE || 'chat-app',
  url: process.env.DATABASE_URL || 'mongodb://localhost:27017/chat-app',
}));
