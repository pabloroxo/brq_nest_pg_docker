import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/shared/jwt-auth.guard';
import { DeleteResult } from 'typeorm';
import { PokemonEntity } from '../models/pokemon.entity';
import { Pokemon } from '../models/pokemon.interface';
import { PokemonService } from '../services/pokemon.service';

@UseGuards(JwtAuthGuard)
@Controller('pokemon')
export class PokemonController {
  constructor(
    private pokemonService: PokemonService
  ) { }

  @Get()
  @ApiTags('Pokémon')
  @ApiSecurity('bearerAuth')
  @ApiResponse({ status: 200, description: 'Listado com sucesso'})
  @ApiResponse({ status: 401, description: 'Token incorreto, inválido ou expirado'})
  @ApiResponse({ status: 500, description: 'Erro do sistema'})
  async findAll(): Promise<Pokemon[]> {
    try {
      return await this.pokemonService.findAll();
    } catch (err) {
      throw new HttpException({ error: err.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':pokemonId')
  @ApiTags('Pokémon')
  @ApiSecurity('bearerAuth')
  @ApiResponse({ status: 200, description: 'Listado com sucesso'})
  @ApiResponse({ status: 401, description: 'Token incorreto, inválido ou expirado'})
  @ApiResponse({ status: 404, description: 'Pokémon não encontrado'})
  @ApiResponse({ status: 500, description: 'Erro do sistema'})
  async find(
    @Param('pokemonId') pokemonId: number
  ): Promise<Pokemon> {
    try {
      return await this.pokemonService.find(pokemonId);
    } catch (err) {
      throw new HttpException({ error: err.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @ApiTags('Pokémon')
  @ApiBody({ type: PokemonEntity })
  @ApiSecurity('bearerAuth')
  @ApiResponse({ status: 201, description: 'Registrado com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro em algum dado informado'})
  @ApiResponse({ status: 401, description: 'Token incorreto, inválido ou expirado'})
  @ApiResponse({ status: 404, description: 'Pokémon não encontrado'})
  @ApiResponse({ status: 409, description: 'Pokémon ID já existente na base de dados'})
  @ApiResponse({ status: 500, description: 'Erro do sistema'})
  async create(
    @Body() pokemon: Pokemon
  ): Promise<Pokemon> {
    try{
      return await this.pokemonService.create(pokemon);
    } catch (err) {
      throw new HttpException({ error: err.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':pokemonId')
  @ApiTags('Pokémon')
  @ApiBody({ type: PokemonEntity })
  @ApiSecurity('bearerAuth')
  @ApiResponse({ status: 200, description: 'Registrado com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro em algum dado informado'})
  @ApiResponse({ status: 401, description: 'Token incorreto, inválido ou expirado'})
  @ApiResponse({ status: 409, description: 'Pokémon ID já existente na base de dados'})
  @ApiResponse({ status: 500, description: 'Erro do sistema'})
  async update(
    @Param('pokemonId') pokemonId: number,
    @Body() pokemon: Pokemon
  ): Promise<Pokemon> {
    try {
      return await this.pokemonService.update(pokemonId, pokemon);
    } catch (err) {
      throw new HttpException({ error: err.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':pokemonId')
  @HttpCode(204)
  @ApiTags('Pokémon')
  @ApiSecurity('bearerAuth')
  @ApiResponse({ status: 204, description: 'Deletado com sucesso'})
  @ApiResponse({ status: 401, description: 'Token incorreto, inválido ou expirado'})
  @ApiResponse({ status: 500, description: 'Erro do sistema'})
  async delete(
    @Param('pokemonId') pokemonId: number
  ): Promise<DeleteResult> {
    try {
      return await this.pokemonService.delete(pokemonId);
    } catch (err) {
      throw new HttpException({ error: err.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
