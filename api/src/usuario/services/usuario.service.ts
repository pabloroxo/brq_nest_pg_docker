import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../models/usuario.entity';
import { Usuario } from '../models/usuario.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>
  ) { }

  async generateHash(password) {
    return await bcrypt.hash(password, 12);
  }

  async find(mail: string): Promise<Usuario> {
    const usuario = this.usuarioRepository.findOne({ mail: mail });
    if (!usuario) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    return usuario;
  }

  async create(usuario: Usuario): Promise<Usuario> {
    if (await this.find(usuario.mail)) {
      throw new HttpException('E-mail já existente na base de dados', HttpStatus.CONFLICT);
    }
    usuario.password = await this.generateHash(usuario.password);
    return this.usuarioRepository.save(usuario);
  }

  async update(id: number, usuario: Usuario): Promise<Usuario> {
    const usuario_mail = await this.find(usuario.mail);
    if (usuario_mail && usuario_mail.id != id) {
      throw new HttpException('E-mail já existente na base de dados', HttpStatus.CONFLICT);
    }
    if (usuario.password) {
      usuario.password = await this.generateHash(usuario.password);
    }
    await this.usuarioRepository.update(id, usuario);
    const usuario_updated =  await this.find(usuario.mail);
    usuario_updated.password = undefined;
    return usuario_updated;
  }
}
