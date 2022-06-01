# TypeScript - Nest.JS (Estudos)

Repositório exclusivo para estudos pessoais de TypeScript utilizando o framework Nest.JS

## Instalação

- Realize a instalação do [Docker](https://docs.docker.com/engine/install/)
- Realiza a instalação do [Docker Compose](https://docs.docker.com/compose/install/)
- Mantenha o docker inicializado
- Execute na pasta raiz do projeto:
```bash
$ cp .env.example .env
```

- Configure o seu arquivo de ambiente
- Execute o seguinte comando para realizar o build do projeto:

```bash
$ docker-compose up --build
```

- Depois de instalado e configurado, para executar, mantenha o docker aberto e execute o comando:

```bash
$ docker-compose up
```

## Lint & Prettier

- Pacotes:
    - Prettier: [Documentação](https://prettier.io/docs/en/index.html)
    - ESLint: [Documentação](https://eslint.org/docs/user-guide/getting-started)
- Execute em seu terminal:
```bash
$ docker-compose exec nestdev yarn run lint
$ docker-compose exec nestdev yarn run format
```

## Rotas (Documentação)

- Pacotes:
    - Swagger: [Documentação](https://docs.nestjs.com/openapi/introduction)
- Acesse: `http://localhost:3000/docs`

## Testes

```bash
# unit tests
$ docker-compose exec nestdev yarn run test

# test coverage
$ docker-compose exec nestdev yarn run test:cov
```

---

![it is not a bug, it is a feature](https://media.giphy.com/media/1afuwyOsr5E8X9CuRV/giphy.gif)

Não é um repositório de bugs e sim um repositório de estudos!

## Licença

Este repositório utiliza [MIT License](https://docs.nestjs.com/support).