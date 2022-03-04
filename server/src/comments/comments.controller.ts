import { Body, Controller, Delete, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { CommentsService } from './comments.service';
import { addCommentDto } from './dto/add-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private commentService: CommentsService) {}

    @Post()
    addComment(@Body() dto: addCommentDto) {
        return this.commentService.addComment(dto)
    }

    @Get()
    getComments(@Query('postId') postId: number) {
        return this.commentService.getAllCommentsByPostId(postId)
    }

    @Delete()
    deleteComment(@Req() req: Request) {
        return this.commentService.delete(req.body)
    }
}
