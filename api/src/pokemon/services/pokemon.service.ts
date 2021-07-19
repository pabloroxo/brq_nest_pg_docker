import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { PokemonEntity } from '../models/pokemon.entity';
import { Pokemon } from '../models/pokemon.interface';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonEntity)
    private readonly pokemonRepository: Repository<PokemonEntity>
  ) { }

  async findAll(): Promise<Pokemon[]> {
    return await this.pokemonRepository.find();
  }

  async find(pokemonId: number, dontThrowException?: boolean): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({ pokemonId: pokemonId })
    if (!pokemon && !dontThrowException) {
      throw new HttpException('Pokémon não encontrado', HttpStatus.NOT_FOUND);
    }
    return pokemon;
  }

  async create(pokemon: Pokemon): Promise<Pokemon> {
    if (await this.find(pokemon.pokemonId, true)) {
      throw new HttpException('Pokémon ID já existente na base de dados', HttpStatus.CONFLICT);
    }
    return await this.pokemonRepository.save(pokemon);
  }

  async update(pokemonId: number, pokemon: Pokemon): Promise<Pokemon> {
    await this.find(pokemonId, false)
    const pokemon_conflicts = await this.find(pokemon.pokemonId)
    if (pokemon_conflicts && pokemon_conflicts.pokemonId != pokemonId) {
      throw new HttpException('Pokémon ID já existente na base de dados', HttpStatus.CONFLICT);
    }
    await this.pokemonRepository.update({ pokemonId: pokemonId }, pokemon);
    return await this.find(pokemon.pokemonId);
  }

  async delete(pokemonId: number): Promise<DeleteResult> {
    await this.find(pokemonId, false)
    return await this.pokemonRepository.delete({ pokemonId });
  }
}
