import { Module } from '@nestjs/common';
import { PokemonService } from './services/pokemon.service';
import { PokemonController } from './controllers/pokemon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonEntity } from './models/pokemon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonEntity])],
  providers: [PokemonService],
  controllers: [PokemonController]
})
export class PokemonModule { }
