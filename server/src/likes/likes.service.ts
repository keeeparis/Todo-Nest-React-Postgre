import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { addLikeDto } from './dto/add-like.dto';
import { Like } from './likes.model';

@Injectable()
export class LikesService {
    constructor(@InjectModel(Like) private likeRepository: typeof Like) {}
    async addLike(dto: addLikeDto) {
        const like = await this.likeRepository.create(dto)
        const likes = await this.likeRepository.findAll({ where: { postId: dto.postId} })
        return likes
    }
}
