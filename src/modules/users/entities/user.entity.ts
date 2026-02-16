import { BaseEntity } from 'src/common/base.entity';
import { RolesUser } from 'src/common/enums/roles-user.enum';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  password_hash: string;

  @Column({ type: 'enum', enum: RolesUser, default: RolesUser.USER })
  rol: RolesUser;
}
