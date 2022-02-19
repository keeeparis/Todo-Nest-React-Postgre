import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './users.model';
import { CreateUserDto } from './dto/create-user-dto';
import { RolesService } from 'src/roles/roles.service';
import { addRoleDto } from './dto/add-role.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {}
    
    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue('ADMIN')
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }
    
    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.findAll({ include: { all: true } }) // TODO: sanitize data (exclude password from response)
        return users
    }

    async getUsersByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email }, include: { all: true } })
        return user
    }

    async addRole(dto: addRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.roleService.getRoleByValue(dto.value)

        if (role && user) {
            await user.$add('role', role.id)
            return dto
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
    }

    async getProfile(email: string): Promise<any> {
        const user = await this.getUsersByEmail(email)
        
        if (!user) {
            throw new HttpException('Email не существует', HttpStatus.NOT_FOUND) // NotFoundException
        }

        return user.sanitizeData()
    }
}
