import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { createPostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post) private postRepository: typeof Post, private fileService: FilesService) {}
    
    async create(dto: createPostDto) {
        try {
            const post = await this.postRepository.create(dto)
            return post
        } catch (e) {
            throw new HttpException('Ошибка при записи поста', HttpStatus.BAD_REQUEST)
        }
    }

    async getAllPosts() {
        try {
            const posts = await this.postRepository.findAll({ include: { all: true } })
            const sanitizedPosts = posts.map(post => post.sanitizeData())
            return sanitizedPosts
        } catch (e) {
            throw new HttpException('Ошибка при получении постов', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
