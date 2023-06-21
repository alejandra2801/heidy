import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  async findOne(id: string): Promise<Permission> {
    return this.permissionRepository.findOneOrFail(id);
  }

  async create(permission: Permission): Promise<Permission> {
    return this.permissionRepository.save(permission);
  }

  async update(id: string, permission: Permission): Promise<Permission> {
    await this.permissionRepository.update(id, permission);
    return this.permissionRepository.findOneOrFail(id);
  }

  async delete(id: string): Promise<void> {
    await this.permissionRepository.delete(id);
  }
}