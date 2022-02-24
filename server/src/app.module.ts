import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { ValidationPipe } from './pipes/validation.pipe';

import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

import { UserRoles } from './roles/user-roles.model';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';
import { Post } from './posts/posts.model';
import { FilesModule } from './files/files.module';
import { LikesModule } from './likes/likes.module';
import { Like } from './likes/likes.model';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
            isGlobal: true
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Post, Like],
            autoLoadModels: true
        }),
        UsersModule,
        PostsModule,
        AuthModule,
        RolesModule,
        FilesModule,
        LikesModule
    ],
    controllers: [],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        }
    ],
})
export class AppModule {}
