import { Body, Controller, Post } from '@nestjs/common';
import { addLikeDto } from './dto/add-like.dto';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
    constructor(private likeService: LikesService) {}

    @Post()
    addLike(@Body() dto: addLikeDto ) {
        return this.likeService.addLike(dto)
    }
}
