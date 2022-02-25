import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { LikesController } from './likes.controller';
import { Like } from './likes.model';
import { LikesService } from './likes.service';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports:[
    SequelizeModule.forFeature([Like, User])
  ]
})
export class LikesModule {}
