<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

- Vue.js

  - simple and fast to develop small apps
  - simple state management with Vuex
  - Great community

- Nestjs:

  - good performance
  - opinionated but encourages best practices
  - Big community and support

- ORM:

  - TypeORM:
    - Supports Typescript and integrates well with Nest.js
    - has a built-in query builder for complex queries
    - has the biggest community (that's why I chose it over MikroORM)
    - comes with a lot of built-in features, ex:
      - Connection pooling
      - Transactions
      - Indices
      - Migrations & automatic migrations generation
      - Query caching
      - CLI

- Authentication

  - Google Authentication:
    - for faster and simpler user experience

- Data Modeling
  - Relational
    - Structured data
    - OLTP access patterns
    - modeling many-to-many relationships
  - PostgreSQL
    - open source with a great community
    - nice benchmarks
    - optimizable
    - I just like it

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
