import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { createPostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post) private postRepository: typeof Post, private fileService: FilesService) {}

    async create(dto: createPostDto, image: any) {
        const filename = await this.fileService.createFile(image)
        const post = await this.postRepository.create({ ...dto, image: filename })
        return post
    }
}
