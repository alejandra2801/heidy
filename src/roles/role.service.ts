import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find({ relations: ['permissions'] });
  }

  async findOne(id: string): Promise<Role> {
    return this.roleRepository.findOneOrFail(id, { relations: ['permissions'] });
  }

  async create(role: Role): Promise<Role> {
    return this.roleRepository.save(role);
  }

  async update(id: string, role: Role): Promise<Role> {
    await this.roleRepository.update(id, role);
    return this.roleRepository.findOneOrFail(id, { relations: ['permissions'] });
  }

  async delete(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }
}