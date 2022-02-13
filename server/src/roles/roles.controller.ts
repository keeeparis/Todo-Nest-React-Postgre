import { Body, Controller, Post } from '@nestjs/common';
import { createRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @Post()
    createRole(@Body() dto: createRoleDto) {
        return this.roleService.createRole(dto)
    }
}
