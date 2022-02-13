import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({ where: { value } }) 
        return role
    }

    async createRole(dto: createRoleDto) {
        const role = await this.roleRepository.create(dto) // TODO: check if role already exists
        return role
    }
}
