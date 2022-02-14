import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

import { Post } from 'src/posts/posts.model';
import { User } from './users.model';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User, Post]),
        AuthModule,
        RolesModule
    ],
    exports: [UsersService]
})
export class UsersModule {}
