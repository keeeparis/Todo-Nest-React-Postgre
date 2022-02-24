import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from 'src/posts/posts.model';
import { User } from 'src/users/users.model';
import { LikesController } from './likes.controller';
import { Like } from './likes.model';
import { LikesService } from './likes.service';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports:[
    SequelizeModule.forFeature([Post, Like, User])
  ]
})
export class LikesModule {}
