import { Body, Controller, Get, Post, UseGuards, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
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

    @UseGuards(JwtAuthGuard)
    @Delete()
    deletePost(@Req() req: Request) {
        return this.postService.delete(req.body.postId)
    }
}
