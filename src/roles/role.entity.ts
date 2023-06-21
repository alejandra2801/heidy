import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Permission } from '../permission/permission.entity';
import { User } from 'src/user/user.entity';
//import { BaseEntity } from '../shared/base.entity';

@Entity()
export class Role {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @ManyToOne(() => User, (user) => user.role)
  roles: User[];
}