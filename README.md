# Backend GraphQL

API GraphQL para administrar usuarios, construida con Node.js, Express, Apollo Server y PostgreSQL. El proyecto utiliza módulos ES (`"type": "module"`).

## Requisitos

- Node.js 20 o superior y npm.
- PostgreSQL en ejecución y una base de datos creada para la aplicación.

## Instalación

Instala las dependencias:

```bash
npm install
```

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=4000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=backend_graphql
DB_PASSWORD=tu_contraseña
DB_PORT=5432
```

Ajusta las variables `DB_*` a tu instalación local. No subas `.env` al repositorio.

## Preparar la base de datos

Conéctate a PostgreSQL, crea la base de datos indicada en `DB_NAME` y ejecuta este SQL en ella:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  age INTEGER,
  role VARCHAR(20) NOT NULL DEFAULT 'user'
    CHECK (role IN ('admin', 'moderator', 'user')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## Ejecutar

Inicia el servidor de desarrollo con nodemon:

```bash
npm run dev
```

El endpoint GraphQL estará disponible en `http://localhost:4000/graphql` (o en el puerto configurado en `PORT`).

## Estructura

- `server.js`: inicia Express y Apollo Server.
- `graphql/schema.js`: conecta los type definitions y resolvers.
- `graphql/typeDefs/`: define el esquema GraphQL.
- `graphql/resolvers/`: implementa las operaciones de usuarios.
- `db/db.js`: configura el pool de conexiones PostgreSQL.
