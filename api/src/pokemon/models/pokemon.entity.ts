import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('pokemon')
export class PokemonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({ type: 'number' })
  pokemonId: number;

  @Column()
  @ApiProperty({ type: 'string' })
  name: string;

  @Column()
  @ApiProperty({ type: 'string' })
  type: string;
}
