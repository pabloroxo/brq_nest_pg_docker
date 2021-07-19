import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";

@Entity('usuario')
export class AuthEntity {
  @Column()
  @ApiProperty({ type: 'string' })
  mail: string;

  @Column()
  @ApiProperty({ type: 'string' })
  password: string;
}
