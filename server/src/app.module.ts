import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ToolModule } from './tool/tool.module';
import { ToolboxModule } from './toolbox/toolbox.module';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/allexceptions.filter';
import { DataSource } from 'typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DB,
      synchronize: parseInt(process.env.SYNCHRONIZE) == 1, // SHOULD
      entities: ['dist/**/*.entity.js'],
    }),
    UserModule,
    AuthModule,
    ToolboxModule,
    ToolModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
],
})
export class AppModule {}


