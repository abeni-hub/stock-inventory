# NestJS Learning Roadmap — Inventory Management Project

A hands-on roadmap for learning NestJS by building a real Inventory Management System.

---

# Project Goal

Build a production-style inventory system while learning:

* NestJS fundamentals
* Dependency Injection (DI)
* PostgreSQL
* Prisma ORM
* Validation
* Authentication & Authorization
* Caching
* Background Jobs
* RabbitMQ
* Testing
* Deployment

By the end, the system should support:

* Products
* Warehouses
* Stock Levels
* Stock Transfers
* Purchase Orders
* Audit Logs
* Authentication
* Background Processing
* Event-Driven Architecture

---

# Week 0 — Setup & TypeScript Foundations

## Goal

Get the development environment working and understand enough TypeScript to learn NestJS comfortably.

## Concepts

### Why TypeScript?

JavaScript errors are discovered at runtime.

Example:

```js
product.qty
```

instead of:

```js
product.quantity
```

TypeScript catches this before the application runs.

### What to Learn

* Interfaces
* Types
* Classes
* Generics
* Async/Await
* Decorators

### Decorators

Example:

```ts
@Controller()
```

Decorators add metadata to classes and methods.

NestJS uses decorators everywhere.

---

## Docs

### TypeScript Handbook

Read:

* The Basics
* Everyday Types

### NestJS

Read:

* First Steps

---

## Build

* Install Node LTS
* Install Docker
* Install Docker Compose
* Install Nest CLI

```bash
npm i -g @nestjs/cli
```

Create project:

```bash
nest new inventory
```

Create Docker services:

* PostgreSQL
* Redis
* RabbitMQ

Run:

```bash
docker compose up
```

Run Nest:

```bash
npm run start:dev
```

---

## Done When

* Docker services start successfully
* Nest application runs
* You can explain:

  * What a decorator is
  * Why TypeScript catches bugs JavaScript misses

---

# Week 1 — Modules, Controllers, Services, Dependency Injection

## Goal

Understand how NestJS applications are structured.

---

## Concepts

### Modules

Feature boundaries.

Examples:

* ProductsModule
* WarehousesModule
* StockModule

Equivalent to Django apps.

---

### Controllers

Handle HTTP requests.

Responsibilities:

* Read request
* Extract parameters
* Call services
* Return response

Controllers should stay thin.

---

### Services

Contain business logic.

Responsibilities:

* Business rules
* Reusable application logic
* Data coordination

---

### Dependency Injection

Instead of:

```ts
new PrismaClient()
```

Classes declare dependencies:

```ts
constructor(
  private readonly productsService: ProductsService,
) {}
```

Nest creates and injects instances.

Benefits:

* Easier testing
* Shared instances
* Loose coupling

---

## Docs

Read:

* Modules
* Controllers
* Providers
* Custom Providers (skim)
* Injection Scopes (singleton only)

---

## Build

Generate:

```bash
nest g module products
nest g controller products
nest g service products
```

Create:

```http
GET /products
GET /products/:id
```

using in-memory data.

Create:

```bash
nest g module warehouses
nest g service warehouses
```

Inject ProductsService into WarehousesService.

---

## Done When

You can explain:

```text
Request
↓
Controller
↓
Service
↓
Response
```

and Dependency Injection without calling it "magic".

---

# Week 2 — PostgreSQL & Prisma

## Goal

Replace in-memory arrays with a real database.

---

## Concepts

### ORM

Object Relational Mapper.

Instead of SQL:

```sql
SELECT * FROM Product;
```

Use:

```ts
prisma.product.findMany()
```

---

### Prisma Service

A shared Prisma client instance managed by Nest.

---

### Separation of Concerns

Controller:

* HTTP

Service:

* Business logic

Prisma:

* Database access

---

## Docs

Read:

### Prisma

* Getting Started
* Prisma Schema
* CRUD Operations
* Migrations

### NestJS

* Database Techniques

---

## Build

Install:

```bash
npm install prisma @prisma/client
```

Initialize:

```bash
npx prisma init
```

Create Product model.

Run migration:

```bash
npx prisma migrate dev --name init
```

Create:

* PrismaModule
* PrismaService

Inject PrismaService into ProductsService.

Implement:

```http
GET    /products
GET    /products/:id
POST   /products
PATCH  /products/:id
DELETE /products/:id
```

---

## Done When

You understand:

```text
Browser
↓
Controller
↓
Service
↓
Prisma
↓
PostgreSQL
```

and all CRUD endpoints work.

---

# Week 3 — DTOs & Validation

## Goal

Prevent invalid data from entering the system.

---

## Concepts

### DTO

Data Transfer Object.

Defines expected request shape.

Example:

```ts
class CreateProductDto {
  name: string;
  quantity: number;
}
```

---

### Validation Pipe

Automatically validates incoming requests.

---

### Class Validator

Example:

```ts
@IsString()
name: string;

@IsInt()
quantity: number;
```

---

## Build

Install:

```bash
npm install class-validator class-transformer
```

Create:

```text
create-product.dto.ts
update-product.dto.ts
```

Enable global validation.

Replace:

```ts
@Body() body: any
```

with DTOs.

---

## Done When

Bad requests return:

```http
400 Bad Request
```

before reaching services.

---

# Week 4 — Relationships & Inventory Domain

## Goal

Model a real inventory system.

---

## Concepts

Database relationships.

### One-to-Many

Warehouse → Products

### Many-to-Many

Products ↔ Warehouses

---

## Build

Create models:

* Warehouse
* Product
* Stock

Endpoints:

```http
GET /warehouses
POST /warehouses

GET /stock
POST /stock
```

---

## Done When

You can query inventory by warehouse.

---

# Week 5 — Authentication & Authorization

## Goal

Secure the application.

---

## Concepts

### JWT Authentication

Login once.

Receive token.

Send token with future requests.

---

### Guards

Protect routes.

---

### Roles

Examples:

* Admin
* Manager
* Staff

---

## Build

Install:

```bash
npm install @nestjs/jwt passport passport-jwt bcrypt
```

Create:

* UsersModule
* AuthModule

Endpoints:

```http
POST /auth/register
POST /auth/login
```

Protect inventory routes.

---

## Done When

Unauthorized users cannot access protected endpoints.

---

# Week 6 — Caching with Redis

## Goal

Improve performance.

---

## Concepts

Cache frequently requested data.

Example:

```text
Product List
↓
Redis
↓
Database only if missing
```

---

## Build

Connect Redis.

Cache:

```http
GET /products
```

Invalidate cache on updates.

---

## Done When

Repeated requests hit Redis.

---

# Week 7 — Background Jobs

## Goal

Move long-running work out of HTTP requests.

---

## Concepts

Queue processing.

User request should not wait for heavy work.

---

## Build

Install BullMQ.

Create jobs:

* Import inventory
* Generate reports

---

## Done When

Jobs run independently of HTTP requests.

---

# Week 8 — RabbitMQ & Event-Driven Architecture

## Goal

Learn microservice communication.

---

## Concepts

Events.

Example:

```text
Stock Updated
↓
Publish Event
↓
Consumers React
```

---

## Build

Publish:

```text
product.created
stock.updated
stock.low
```

Consume events.

---

## Done When

RabbitMQ producers and consumers communicate successfully.

---

# Week 9 — Testing

## Goal

Write reliable code.

---

## Concepts

### Unit Tests

Test services in isolation.

### Integration Tests

Test complete request flow.

---

## Build

Test:

* ProductsService
* AuthService
* Inventory logic

Use mocked dependencies.

---

## Done When

Critical business logic has automated tests.

---

# Week 10 — Logging & Monitoring

## Goal

Make the system observable.

---

## Build

Add:

* Structured logging
* Request logging
* Error logging

Track:

* Failed requests
* Queue failures
* Authentication failures

---

## Done When

Problems can be diagnosed from logs.

---

# Week 11 — Deployment

## Goal

Deploy the application.

---

## Concepts

Production readiness.

---

## Build

Dockerize:

* NestJS
* PostgreSQL
* Redis
* RabbitMQ

Deploy to:

* VPS
* Railway
* Render
* Fly.io

Use environment variables.

---

## Done When

Application is accessible publicly.

---

# Week 12 — Capstone

## Goal

Build a production-style Inventory System.

---

## Features

### Products

CRUD operations

### Warehouses

CRUD operations

### Inventory

Track stock per warehouse

### Transfers

Move inventory between warehouses

### Authentication

JWT + Roles

### Caching

Redis

### Background Jobs

BullMQ

### Events

RabbitMQ

### Tests

Unit + Integration

### Deployment

Production environment

---

# Final Architecture

```text
Client
↓
Controllers
↓
Services
↓
Repositories
↓
Prisma
↓
PostgreSQL

        ↓
      Redis

        ↓
      BullMQ

        ↓
     RabbitMQ
```

By completing this roadmap, you'll understand not only NestJS syntax but also the architecture patterns used in production backend systems.
