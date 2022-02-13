import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { addRoleDto } from './dto/add-role.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Получение всех пользователей' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    getAll(): Promise<User[]> {
        return this.usersService.getAllUsers() // TODO: видеть всех пользователей может только админ
    }

    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('profile')
    getProfile(@Req() req) {
        return req.user
    }

    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('role')
    addRole(@Body() dto: addRoleDto) {
        return this.usersService.addRole(dto)
    }
}
