import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from '../../auth/models/auth.entity';
import { UsuarioEntity } from '../../usuario/models/usuario.entity';
import { Usuario } from '../../usuario/models/usuario.interface';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }
  @Post('register')
  @ApiTags('Autenticação')
  @ApiBody({ type: UsuarioEntity })
  @ApiResponse({ status: 201, description: 'Registrado com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro em algum dado informado'})
  @ApiResponse({ status: 409, description: 'E-mail já existente na base de dados'})
  @ApiResponse({ status: 500, description: 'Erro do sistema'})
  async register(
    @Body() usuario: Usuario
  ) {
    try {
      return this.authService.register(usuario);
    } catch (err) {
      throw new HttpException({ error: err.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('authenticate')
  @HttpCode(200)
  @ApiTags('Autenticação')
  @ApiBody({ type: AuthEntity })
  @ApiResponse({ status: 200, description: 'Autenticado com sucesso'})
  @ApiResponse({ status: 400, description: 'Erro em algum dado informado'})
  @ApiResponse({ status: 401, description: 'A senha está incorreta'})
  @ApiResponse({ status: 404, description: 'Usuário não encontrado'})
  @ApiResponse({ status: 500, description: 'Erro do sistema'})
  authenticate(
    @Body('mail') mail: string,
    @Body('password') password: string,
  ) {
    try {
      return this.authService.authenticate(mail, password);
    } catch (err) {
      throw new HttpException({ error: err.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}