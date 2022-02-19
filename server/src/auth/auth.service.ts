import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'

import { User } from 'src/users/users.model';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';

type tokenObjectType = {
    token: string   
}

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async register(userDto: CreateUserDto, res: Response) {
        const candidate = await this.userService.getUsersByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('Пользователь с таким e-mail уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({ ...userDto, password: hashPassword })
        
        const token = this.generateToken(user)
        this.setResponseCookie(res, token)
        return res.send(user.sanitizeData())
    }

    private generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async login(userDto: CreateUserDto, res: Response) {
        const user = await this.validateUser(userDto)
        const token = this.generateToken(user)

        this.setResponseCookie(res, token)
        return res.send(user.sanitizeData())
    }
    
    private async validateUser(userDto: CreateUserDto): Promise<User> {
        try {
            const user = await this.userService.getUsersByEmail(userDto.email)
            const passwordsEqual = await bcrypt.compare(userDto.password, user.password)
    
            if (user && passwordsEqual) {
                return user
            } else {
                throw new UnauthorizedException({ message: 'Некорректный email или пароль' })
            }
        } catch (e) {
            throw new UnauthorizedException({ message: 'Некорректный email или пароль' })
        }
    }

    private setResponseCookie(res: Response, token: tokenObjectType) {
        res.cookie('auth', token.token, {
            expires: new Date(new Date().getTime() + 5 * 60 * 1000), // 5min
            sameSite: 'strict',
            httpOnly: true,
        })
    }
}
