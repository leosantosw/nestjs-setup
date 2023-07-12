<h1 align="center">NestJS - Setup</h1>

<p align="center">📚 This project is a NestJS setup for building APIs. 🧪</p>

## Description 💡 <a name="description"></a>

[TODO]

---

## Installation 🛠️ <a name="installation"></a>

1. Open the terminal or command prompt and navigate to the project's root directory.

2. Run the following command to run the project:
   ```bash
   docker compose up

## Scripts 🚀 <a name="scripts"></a>

- `npm run build` - Compiles the NestJS project.
- `npm run format` - Automatically formats all TypeScript files in the `src/` directory.
- `npm start` - Starts the NestJS server in production mode.
- `npm run start:dev` - Starts the NestJS server in development mode with file change monitoring.
- `npm run start:prod` - Starts the compiled Node.js server in production mode.
- `npm run lint` - Runs the ESLint tool to check and automatically fix code style issues in the TypeScript files located in the `src/`, `apps/`, `libs/`, and `test/` directories.
- `npm test` - Runs unit tests using the Jest framework.
- `npm run test:watch` - Runs unit tests in watch mode, automatically re-running tests whenever files are modified.
- `npm run test:cov` - Runs unit tests and generates a code coverage report using the Jest framework.
- `npm run prepare` - Installs Husky hooks to automate tasks before commits and pushes.

---

## Prisma 🛢️ <a name="prisma"></a>

Prisma is an ORM tool used in this project for database access and management.

### Seed 🌱

The seed script is responsible for populating the database with initial data. To run it, use the following command:

```bash
npx prisma db seed
