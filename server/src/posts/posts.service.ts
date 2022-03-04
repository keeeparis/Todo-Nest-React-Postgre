import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from 'src/comments/comments.model';
import { FilesService } from 'src/files/files.service';
import { Like } from 'src/likes/likes.model';
import { User } from 'src/users/users.model';
import { createPostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post) private postRepository: typeof Post, private fileService: FilesService) {}
    
    async create(dto: createPostDto) {
        try {
            const candidatePost = await this.postRepository.create(dto)
            const post = await this.postRepository.findByPk(candidatePost.id, { include: { all: true } })
            return post.sanitizeData()
        } catch (e) {
            throw new HttpException('Ошибка при записи поста', HttpStatus.BAD_REQUEST)
        }
    }

    async getAllPosts() {
        try {
            const posts = await this.postRepository.findAll({ include: [User, Like, Comment] })
            const sanitizedPosts = posts.map(post => post.sanitizeData())
            return sanitizedPosts
        } catch (e) {
            throw new HttpException('Ошибка при получении постов', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async delete(postId: number) {
        try {
            await this.postRepository.destroy({ where: { id: postId }})
            return postId
        } catch (e) {
            throw new HttpException('Невозможно удалить выбранный пост', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
