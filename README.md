# Orchid Movie Server

**Orchid Movie Server** is the backend API for the Orchid Movie client, built with **Node.js** and **Express**. This server handles movie data, including creation, updates, and deletions, as well as user-related operations like managing favorites.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Routes](#routes)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [License](#license)
- [Author](#author)

---

## Features

- **Movies API**:
  - Create, read, update, and delete movies.
  - Fetch top-rated movies.
- **User API**:
  - Add, remove, and view favorite movies based on user email.

---

## Getting Started

### Prerequisites

- **Node.js** (v16 or later)
- **MongoDB** for data storage
- **Nodemon** for auto-reloading during development (optional but recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/orchid-movie-server.git
   ```

2. Navigate to the project directory:

   ```bash
   cd orchid-movie-server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file for environment variables (see [Environment Variables](#environment-variables)):

   ```bash
   touch .env
   ```

---

## Routes

### Movies Routes (`/api/movies`)

- **GET /api/movies**: Get all movies.
- **POST /api/movies**: Create a new movie.
- **GET /api/movies/top-rated**: Get the top-rated movies.
- **GET /api/movies/:id**: Get a movie by ID.
- **DELETE /api/movies/:id**: Delete a movie by ID.
- **PATCH /api/movies/:id**: Update a movie by ID.

### User Routes (`/api/users`)

- **POST /api/users/favorites/:email**: Add a movie to the user's favorites (requires email).
- **GET /api/users/favorites/:email**: Get all favorite movies of a user (requires email).
- **DELETE /api/users/favorites/:email**: Remove a movie from the user's favorites (requires email).

---

## Scripts

- **Start server**:

  ```bash
  npm run start
  ```

  Starts the server using `node server.js`.

- **Start server with auto-reload**:

  ```bash
  npm run server
  ```

  Starts the server with `nodemon` for auto-reloading.

- **Run tests**:

  ```bash
  npm run test
  ```

  Placeholder for future tests.

---

## Dependencies

- **[express](https://www.npmjs.com/package/express)**: Web framework for Node.js.
- **[mongodb](https://www.npmjs.com/package/mongodb)**: MongoDB database driver.
- **[cors](https://www.npmjs.com/package/cors)**: Middleware for enabling Cross-Origin Resource Sharing.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Loads environment variables from a `.env` file.
- **[http-errors](https://www.npmjs.com/package/http-errors)**: HTTP error handling.

---

## Dev Dependencies

- **[nodemon](https://www.npmjs.com/package/nodemon)**: Automatically restarts the server during development.
- **[eslint](https://www.npmjs.com/package/eslint)**: Linting for JavaScript and Node.js.
- **[@eslint/js](https://www.npmjs.com/package/@eslint/js)**: ESLint configuration for JavaScript.
- **[@types/express](https://www.npmjs.com/package/@types/express)**: TypeScript typings for Express.
- **[@types/mongodb](https://www.npmjs.com/package/@types/mongodb)**: TypeScript typings for MongoDB.

---

## License

This project is licensed under the ISC License.

---

## Author

- **Tahsin Alahi**
  - [GitHub](https://github.com/TahsinAlahi)
  - [LinkedIn](https://www.linkedin.com/in/tahsinalahi/)
