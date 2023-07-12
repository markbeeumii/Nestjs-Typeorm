import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PasswordTransformer } from "../password.transformer";

@Entity()
export class UserEntity{
  @PrimaryGeneratedColumn({ 
    name: 'id',
    type : 'int', 
    //primaryKeyConstraintName: 'id'
  })
  id: number;

  @Column({
    type : 'varchar',
    nullable: true
  })
  username ? : string;

  @Column({
    name : 'email',
    type : 'nvarchar',
    unique : true
  })
  email : string;

  @Column({
    name : 'password',
    type : 'varchar',
    transformer : new PasswordTransformer(),
    length: 255
  })
  password : string;

  @Column({
    name : 'first_name',
    type : 'varchar',
    nullable : true
  })
  first_name  : string;
  
  @Column({
    name : 'last_name',
    type : 'varchar',
    nullable : true
  })
  last_name  : string;

  @Column({
    name : 'profile_picture',
    type : 'varchar',
    nullable : true,
    length: 255
  })
  profile_picture  : string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
