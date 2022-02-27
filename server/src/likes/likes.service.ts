import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { addLikeDto } from './dto/add-like.dto';
import { Like } from './likes.model';

@Injectable()
export class LikesService {
    constructor(@InjectModel(Like) private likeRepository: typeof Like) {}

    async addLike(dto: addLikeDto) {
        const candidateLike = await this.likeRepository.findOne({ where: { postId: dto.postId, userId: dto.userId }, include: { all: true } })
        
        if (!candidateLike) {
            await this.likeRepository.create(dto)
        } else {
            await this.likeRepository.destroy({ where: { postId: dto.postId, userId: dto.userId }})
        }

        const likes = await this.getLikesByPostId(dto.postId)

        const sanitizedLikes = likes.map(like => like.sanitizeData())
        const responseObj = { postId: dto.postId, likes: sanitizedLikes }
        return responseObj
    }

    private async getLikesByPostId (postId: number) {
        const likesTotal = await this.likeRepository.findAll({ where: { postId }, include: { all: true } })
        return likesTotal
    }
}
