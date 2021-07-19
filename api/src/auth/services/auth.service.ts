import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Usuario } from '../../usuario/models/usuario.interface';
import { UsuarioService } from '../../usuario/services/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService
  ) { }

  generateToken(id) {
    return this.jwtService.sign({ id: id }, { secret: process.env.JWT_SECRET, expiresIn: 86400 });
  }

  async register(
    usuario: Usuario
  ): Promise<Usuario> {
    const usuario_created = await this.usuarioService.create(usuario);
    usuario.token = this.generateToken(usuario.id);
    usuario_created.password = undefined;
    return usuario_created;
  }

  async authenticate(
    mail: string,
    password: string
  ): Promise<Usuario> {
    const usuario = await this.usuarioService.find(mail);
    if (usuario && bcrypt.compareSync(password, usuario.password)) {
      usuario.token = this.generateToken(usuario.id);
      usuario.password = undefined;
      return usuario;
    }
    throw new HttpException('E-mail ou senha incorreto', HttpStatus.UNAUTHORIZED);
  }
}
