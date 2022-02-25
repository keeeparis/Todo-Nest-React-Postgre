import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'

import { User } from 'src/users/users.model';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async register(userDto: CreateUserDto) {
        const candidate = await this.userService.getUsersByEmail(userDto.email)
        if (candidate) {
            throw new HttpException('Пользователь с таким e-mail уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.createUser({ ...userDto, password: hashPassword })
        
        const token = this.generateToken(user)
        
        return { user: user.sanitizeData(), token }
    }

    private generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        const token = this.generateToken(user)

        return { user: user.sanitizeData(), token }
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
            console.log(e)
            throw new UnauthorizedException({ message: 'Некорректный email или пароль' })
        }
    }
}
