import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './controllers/usuario.controller';
import { UsuarioEntity } from './models/usuario.entity';
import { UsuarioService } from './services/usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService]
})
export class UsuarioModule { }
