import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Mestre Pokémon')
    .setVersion('1.0.0')
    .setDescription('Temos que pegar!')
    .setContact('Pablo Roxo', 'https://roxo.dev.br', 'pabloricardoroxosilva@gmail.com')
    .addServer('http://localhost:3000')
    .addSecurity('bearerAuth', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}

bootstrap();
