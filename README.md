<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Dot Intern Event API

A simple event management REST API implemented with NestJS — created as an internship technical test.

## Project Overview

This application provides endpoints for managing events, registering users for events and leaving feedback. The API is built as a small, pragmatic backend suitable for an internship-level technical evaluation.

Use case: Event management API for a technical test (organizers can create events; users can register and leave feedback).

---

## Features

- JWT-based authentication (login / register)
- Role support: **user** and **organizer**
- Event management (create, update, delete by organizers)
- Event registration (users can join events)
- Feedback system (users can leave feedback for events they joined; organizers can delete feedback on their events)
- Pagination support on list endpoints
- Swagger (OpenAPI) documentation available
- E2E tests for authentication and protected routes

---

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT Authentication
- Swagger (OpenAPI)
- Jest (e2e testing)

---

## Architecture Pattern

This project uses a **Layered Architecture** comprised of the following layers:

- Controller — handles HTTP requests and maps them to services
- Service — contains business logic and orchestrates operations
- Repository — data access layer (TypeORM entities + repositories)

Why layered?
- Familiar and easy to reason about for small-to-medium projects
- Clear separation of concerns between HTTP handling, business logic and data persistence
- Appropriate scope for an internship technical evaluation

Note: For larger systems, Clean Architecture or Hexagonal Architecture could be adopted for improved decoupling; the layered approach here was chosen intentionally for clarity and brevity.

---

## API Documentation (Swagger)

Interactive API docs are available at:

http://localhost:3000/api/docs

Swagger documents all existing endpoints and supports JWT Bearer authentication using the **Authorize** button. To call protected endpoints from the UI, click **Authorize** and enter a value in the form "Bearer <token>".

Resource tags in Swagger: Auth, Users, Events, Registrations, Feedbacks, JWT Auth

---

## Running the project

1. Install dependencies

```bash
npm install
```

2. Environment variables

Copy `.env.example` (if present) and ensure environment values are set for:

- DATABASE_URL (Postgres connection string)
- JWT_SECRET
- PORT (optional, defaults to 3000)

3. Run locally

```bash
# development
npm run start:dev
```

Open the docs at http://localhost:3000/api/docs

---

## Testing

E2E tests are present and cover authentication flows and protected endpoints (JWT validation). Run tests with:

```bash
npm run test:e2e
```

These tests ensure:
- Registration and login return a valid access token
- Protected endpoints return 401 when no or invalid token is provided
- Endpoints allow access with a valid token

---

## Notes

- This repository purposefully avoids adding features beyond the specification of the test; only existing endpoints are documented and visible in Swagger.
- The API is stateless and uses JWT tokens; logout endpoint exists for symmetry but token revocation is not implemented (client-side token discard is expected).

---

If you need help running the project or want CI configured to run lint and e2e, I can add that next.
