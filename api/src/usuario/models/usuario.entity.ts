import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ type: 'string' })
  nickname: string;

  @Column()
  @ApiProperty({ type: 'string' })
  mail: string;

  @Column()
  @ApiProperty({ type: 'string' })
  password: string;
}
