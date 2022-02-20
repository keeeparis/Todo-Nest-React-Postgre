import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createPostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    createPost(@Body() dto: createPostDto) {
        return this.postService.create(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllPosts() {
        return this.postService.getAllPosts()
    }
}
