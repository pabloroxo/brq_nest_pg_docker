# Mestre Pokémon

## Descrição

Este repositório foi criado para conter a aplicação Mestre Pokémon. Trata-se de um teste técnico para uma vaga de trabalho.

## Bibliotecas utilizadas

###### (em ordem alfabética)

- NestJS: framework para criação de APIs em JavaScript
- JWT (JSON Web Token): método de autenticação
- Bcrypt: biblioteca para encriptação de senhas
- TypeORM: mapeador objeto-relacional para abstração do banco de dados
- Swagger: documentação de APIs

## Instalação

Primeiramente é necessário ter a seguinte aplicaão instalada em seu computador:

- Docker: https://www.docker.com/

Dentro do contêiner do projeto encontram-se as aplicações:

- NodeJS: ambiente de execução JavaScript para servidor
- PostgreSQL: sistema gerenciador de banco de dados

Assim que for feito o clone deste repositório, é necessário acessar o diretório da aplicação através do terminal e criar o arquivo .env:

`> cp ./api/.env.example ./api/.env`

## Execução

Para inicializar o projeto, basta executar:

`> docker-compose --env-file ./api/.env up --build`

E então, após o download das imagens e execução dos comandos iniciais, o projeto estará sendo executo no endereço http://localhost:3000.

## Documentação

Uma vez executando o projeto, a documentação da API encontra-se em http://localhost:3000/docs.

## Testes

Na raiz deste projeto encontra-se uma coleção do Postman (arquivo: `Mestre Pokémon.postman_collection.json`) para ser importada, com as principais requisições. Em cada uma delas há pelo menos um teste automatizado do caso de acerto.