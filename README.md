# TypeScript - Nest.JS (Estudos)

Repositório exclusivo para estudos pessoais de TypeScript utilizando o framework Nest.JS

## Instalação

- Realize a instalação do [Docker](https://docs.docker.com/engine/install/)
- Mantenha o docker inicializado
- Execute na pasta raiz do projeto:
```bash
# copy .env.example
$ cp .env.example .env
```

Configure o seu arquivo de ambiente e execute também na raiz, execute o seguinte comando para realizar o build
de seu projeto:

```bash
# development - docker
$ docker-compose up --build
```

## Execução

- Execute na pasta raiz do projeto para executar o seu projeto:
```bash
# development - docker
$ docker-compose up
```

## Documentação de rotas

- Este projeto utiliza o pacote `@nestjs/swagger` para controle de documentação de rotas. Acesse:
```bash
http://localhost:3000/docs
```

## Execução de testes

```bash
# unit tests
$ docker-compose exec app npm run test

# test coverage
$ docker-compose exec app npm run test:cov
```

---

![it is not a bug, it is a feature](https://media.giphy.com/media/1afuwyOsr5E8X9CuRV/giphy.gif)

Não é um repositório de bugs e sim um repositório de estudos!

## Licença

Este repositório utiliza [MIT License](https://docs.nestjs.com/support).