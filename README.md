# typescript-lambda-scaffolding
Scaffolding completo para ambiente AWS Lambdas usando Hexagonal + Clean Code + SOLID + DI + Inverse DI


### Estrutura:
```graphql
app/
│
├── src/
│   ├── application/
│   │   ├── use_cases/
│   │   │   ├── CreateUser.ts       # Caso de uso para criação de usuário
│   │   │   ├── GetUser.ts          # Caso de uso para obter usuário
│   │   │   ├── UpdateUser.ts       # Caso de uso para atualização de usuário
│   │   │   └── DeleteUser.ts       # Caso de uso para exclusão de usuário
│   │   │
│   │   └── interfaces/
│   │       └── IUserService.ts     # Interface para o serviço de usuário
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   └── User.ts             # Entidade User
│   │   │
│   │   ├── services/
│   │   │   └── UserService.ts      # Serviço do domínio User
│   │   │
│   │   └── interfaces/
│   │       └── IUserRepository.ts  # Interface do repositório User
│   │
│   ├── infrastructure/
│   │   ├── config/
│   │   │   └── index.ts            # Configurações centralizadas
│   │   │
│   │   ├── db/
│   │   │   └── UserRepository.ts   # Implementação do repositório com Mongoose
│   │   │
│   │   ├── webserver/
│   │   │   ├── server.ts           # Configuração do servidor
│   │   │   └── routes.ts           # Rotas do servidor
│   │   │
│   │   └── lambda/
│   │       └── handler.ts          # Adaptador para AWS Lambda
│   │
│   └── shared/
│       ├── middleware/
│       │   └── errorHandling.ts    # Middleware de tratamento de erros
│       │
│       └── utilities/
│           └── logger.ts           # Utilitário para logging
│
├── tests/
│   ├── unit/
│   │   └── UserService.test.ts     # Testes unitários para UserService
│   │
│   └── integration/
│       └── UserRoutes.test.ts      # Testes de integração para rotas de User
│
├── package.json
└── tsconfig.json
```
