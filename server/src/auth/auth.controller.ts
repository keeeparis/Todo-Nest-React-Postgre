import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

type TokenObject = {
    token: string
}

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    async login(@Body() userDto: CreateUserDto, @Res() res: Response) {
        const { user, token } = await this.authService.login(userDto)
        this.setAuthCookie(res, token)
        return res.send(user)
    }

    @Post('/register')
    async register(@Body() userDto: CreateUserDto, @Res() res: Response) {
        const { user, token } = await this.authService.register(userDto)
        this.setAuthCookie(res, token)
        return res.send(user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/logout')
    logout(@Res() res: Response) {
        res.clearCookie('auth')
        return res.send('Log out')
    }

    private setAuthCookie(res: Response, token: TokenObject) {
        res.cookie('auth', token.token, {
            expires: new Date(new Date().getTime() + 30 * 60 * 1000), // 30min
            sameSite: 'strict',
            httpOnly: true,
        })
    }
} 
