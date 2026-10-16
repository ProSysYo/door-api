## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

## Resources

```bash
npx prisma migrate dev --name enter_name
npx prisma generate
npx prisma db seed

npx prisma migrate reset --force !!!УДАЛИТ ВСЕ ДАННЫЕ В БД!!! ОСТОРОЖНО!!! 
```