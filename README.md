# 📅 Event Management System

**Backend REST API** for simple event management, built using **NestJS** as part of an **internship technical assessment**. This project focuses on authentication, authorization, API design, and testability rather than feature breadth. 

---

## 🎯 Project Purpose

This repository was specifically created to demonstrate:

* **Proper API Structure** and organization.
* **Secure Authentication** based on JWT.
* **Role-Based Access Control (RBAC)** (User & Organizer).
* **Clear Separation of Concerns** between layers.
* **End-to-End (E2E) Testing** for token validation and protected routes.
* **API Documentation** using Swagger.

The scope of this project is intentionally kept concise to align with the expectations of an internship-level technical evaluation. 

---

## ✨ Core Features

* 🔐 **JWT Authentication**: User registration and login.
* 👥 **Role Support**: Supports `user` and `organizer` roles.
* 🎫 **Event Management**: Create, update, and delete events (exclusive to `organizer`).
* 📝 **Event Registration**: Users can register for available events.
* 💬 **Feedback System**: Review system for each event.
* 📑 **Pagination**: Implemented on list endpoints for data efficiency.
* 📖 **Swagger Documentation**: Interactive API documentation.
* 🧪 **E2E Testing**: Focused on token validation & protected routes.

---

## 🛠️ Tech Stack

* **Framework**: [NestJS](https://nestjs.com/) 
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Database**: [PostgreSQL](https://www.postgresql.org/) 
* **ORM**: [TypeORM](https://typeorm.io/)
* **Security**: JWT (JSON Web Token)
* **Documentation**: Swagger (OpenAPI)
* **Testing**: Jest (E2E Testing)

---

## 🏗️ Architecture Overview

This project implements a **Layered Architecture** pattern with clear responsibility boundaries:

`Controller ➔ Service ➔ Repository`

### Layer Responsibilities

* **Controller**: Handles HTTP requests & responses, request validation (DTOs), and authentication guards.
* **Service**: Contains core application business logic, workflow orchestration, and business rule enforcement.
* **Repository**: Handles data persistence using TypeORM and abstracts database operations.

### Why Layered Architecture?

Chosen because it provides the best balance for this project's scale:

* ✅ Easy to understand and review within a limited timeframe.
* ✅ Provides clear separation of concerns without overengineering.
* ✅ Enables meaningful E2E testing without complex abstractions.

---

## 📚 API Documentation (Swagger)

Interactive API documentation is available at:
 `http://localhost:3000/api/docs`

**How to use Protected Endpoints:**

1. Login to obtain an `access_token`.
2. Click the **Authorize** button in the Swagger UI.
3. Enter the format: `Bearer <your_token>`. 

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install

```

### 2. Environment Configuration

Set the following environment variables (or use a `.env` file):

* `DATABASE_URL`: PostgreSQL connection string.
* `JWT_SECRET`: Secret key for JWT signing.
* `JWT_EXPIRES_IN`: JWT expiration time.

### 3. Run the Application

```bash
# Development mode
npm run start:dev

```

The API will be running at `http://localhost:3000`. 

---

## 🧪 Testing

E2E tests are included to validate the authentication flow and protected routes.

```bash
npm run test:e2e

```

**Test Coverage:**

* Successful Registration & Login returning a valid JWT.
* Access denial for protected routes without a token.
* Access denial for invalid or expired tokens.
* Successful access using a valid token.

---

## 📝 Notes

* This API is **stateless** using JWT.
* Token revocation is not implemented; logout is handled on the client side. 
* Only features relevant to the technical assessment have been implemented.

---

## 👤 Author

**Mukti Abdi**
*Backend Developer (Internship Candidate)* 
