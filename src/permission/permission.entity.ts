import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';

@Entity()
export class Permission extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}