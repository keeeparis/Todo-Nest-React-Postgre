import { Body, Controller, Post } from '@nestjs/common';
import { createPostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}

    @Post()
    createPost(@Body() dto: createPostDto) {
        return this.postService.create(dto)
    }
}
