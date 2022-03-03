import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { addCommentDto } from './dto/add-comment.dto';

@Injectable()
export class CommentsService {
    constructor(@InjectModel(Comment) private commentRepository: typeof Comment) {}

    async addComment(dto: addCommentDto) {
        try {
            await this.commentRepository.create(dto)

            const comments = await this.getAllCommentsByPostId(dto.postId)
            const responseObj = { postId: dto.postId, comments }
            return responseObj
        } catch (e) {
            throw new HttpException('Ошибка при записи комментария', HttpStatus.BAD_REQUEST)
        }
    }

    async getAllCommentsByPostId(postId: number) {
        try {
            const comments = await this.commentRepository.findAll({ where: { postId }, include: { all: true } })
            const sanitizedComments = comments.map(post => post.sanitizeData())
            return sanitizedComments
        } catch (e) {
            throw new HttpException('Ошибка при получении комментариев', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
