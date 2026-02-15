import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        database: config.get<string>('DB_NAME'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        entities: [__dirname + '/../modules/**/**/*.entity.{ts,js}'],
        synchronize: config.get<string>('NODE_ENV') === 'dev',
      }),
    }),
  ],
})
export class DatabaseModule {}
