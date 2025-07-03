import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
    }),
    MongooseModule.forRoot(
      (() => {
        const databaseUrl = process.env.DATABASE_URL;

        if (!databaseUrl) {
          throw new Error('❌ DATABASE_URL is missing!\n');
        }

        return databaseUrl;
      })(),
    ),
  ],
})
export class AppModule {}
