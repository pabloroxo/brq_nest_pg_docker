import { Body, Controller, HttpException, HttpStatus, Put, Request, UseGuards } from '@nestjs/common';
import { Usuario } from '../models/usuario.interface';
import { UsuarioService } from '../services/usuario.service';
import jwt_decode from "jwt-decode";
import { JwtAuthGuard } from '../../auth/shared/jwt-auth.guard';
import { ApiBody, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UsuarioEntity } from '../models/usuario.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(
    private usuarioService: UsuarioService
  ) { }
  
  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiTags('Usuário')
  @ApiBody({ type: UsuarioEntity })
  @ApiSecurity('bearerAuth')
  @ApiResponse({ status: 200, description: 'Editado com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro em algum dado informado'})
  @ApiResponse({ status: 401, description: 'Token incorreto, inválido ou expirado'})
  @ApiResponse({ status: 409, description: 'E-mail já existente na base de dados'})
  @ApiResponse({ status: 500, description: 'Erro do sistema'})
  async update(
    @Body() usuario: Usuario,
    @Request() request: any
  ): Promise<Usuario> {
    try {
      let token = request.headers.authorization.split(' ')[1];
      token = jwt_decode(token);
      return await this.usuarioService.update(token.id, usuario);
    } catch (err) {
      throw new HttpException({ error: err.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
