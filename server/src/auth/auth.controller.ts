import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    async login(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
        const token = await this.authService.login(userDto, res)
        return token
    }

    @Post('/register')
    async register(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res: Response) {
        const token = await this.authService.register(userDto, res)
        return token
    }
}
