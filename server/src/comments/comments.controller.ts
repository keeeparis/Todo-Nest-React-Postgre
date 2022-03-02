import { Body, Controller, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { addCommentDto } from './dto/add-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private commentService: CommentsService) {}

    @Post()
    addComment(@Body() dto: addCommentDto) {
        return this.commentService.addComment(dto)
    }
}
