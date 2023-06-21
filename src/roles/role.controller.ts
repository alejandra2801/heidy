import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { Roles } from '../auth/roles.decorator';
import { Role as UserRole } from '../role/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @Post()
  async create(@Body() role: Role): Promise<Role> {
    return this.roleService.create(role);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() role: Role): Promise<Role> {
    return this.roleService.update(id, role);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.roleService.delete(id);
  }
}