# Devbox
  Treat your swiss-knives.

## Description
  Anyone works with tech will usually have multiple tools under their belt. This website allows users to **manage** their favourite tools, categorize and organize them in custom toolboxes. It also encourages users to share their toolboxes, allowing other users to **merge** them into theirs, or **clone** them into their accounts. The website has a **rating system** because good tools deserve to be posted on a **winner board** !
  
  
## Technologies and Reasoning
- Vue.js
  - simple and fast to develop small apps
  - simple state management with Vuex
  - Great community

- Nestjs:
  - good performance
  - opinionated but encourages best practices
  - Big community and support
  - Out-of-the-box Integration with class-validator 

- TypeORM:
  - Supports Typescript and integrates well with Nest.js
  - has a built-in query builder for complex queries
  - has the biggest community (that's why I chose it over MikroORM)
  - integrates well with class-validator
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
    - nice performance
    - supports materialized views and JSON datastructure


## Installation and Running
### Locally
    - Install server and client dependencies
    cd server && npm i --save && cd ../client && npm i --save && cd ..
    - Start services with docker-compose with your custom env file
    cd server && sudo docker compose --env-file dev.env up
    - Run server and client  414  sudo docker compose --env-file dev.env up (in a new terminal)
    cd server && npm run serve && cd ../client && npm run serve
    TODO: Add server and client to docker-compose
