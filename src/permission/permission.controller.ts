import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { Permission } from './permission.entity';
import { PermissionService } from './permission.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../role/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async findAll(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id')id: string): Promise<Permission> {
    return this.permissionService.findOne(id);
  }

  @Post()
  async create(@Body() permission: Permission): Promise<Permission> {
    return this.permissionService.create(permission);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() permission: Permission): Promise<Permission> {
    return this.permissionService.update(id, permission);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.permissionService.delete(id);
  }
}