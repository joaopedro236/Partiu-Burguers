# Partiu Burguers 🍔

A restaurant menu web application. The project combines a React interface for browsing products and managing a cart with a FastAPI backend connected to PostgreSQL. Redis is used to cache the menu.

## Technologies

<p>
  <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img alt="Python" src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img alt="FastAPI" src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img alt="Redis" src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
</p>

## Features

- Displays active menu items organized by category.
- Stores the cart in the browser and fetches the corresponding items from the API.
- Caches menu data with Redis.
- Limits the API to 30 requests per second per IP address.

## Prerequisites

- Node.js and pnpm (or npm)
- Python 3.10 or later
- A PostgreSQL instance accessible to the application
- A Redis instance (optional; without Redis, API caching will not be available)

## Setup

Clone the repository and enter the project directory:

```bash
git clone https://github.com/joaopedro236/Partiu-Burguers.git
cd Partiu-Burguers
```

Create a `.env` file in the project root and set the variables for your environment:

```env
# API base URL used by the frontend, without a trailing slash
VITE_API_URL=http://localhost:8000

# Origins allowed to access the API (comma-separated for multiple origins)
FRONTEND_URLS=http://localhost:5173

# Redis connection URL
REDIS_URL=redis://localhost:6379

# PostgreSQL credentials
# The database connection is configured to require SSL.
db_host_Order=
db_post_Order=5432
db_database_Order=
db_user_Order=
db_password_Order=
```

> Vite exposes frontend environment variables prefixed with `VITE_`. Restart the development server after changing the `.env` file.

## Run the frontend

From the repository root, install the dependencies and start Vite:

```bash
pnpm install
pnpm dev
```

Alternatively, use npm:

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (by default, `http://localhost:5173`). To build and preview the production version:

```bash
pnpm build
pnpm preview
```

## Run the API

Set up a Python environment, install the dependencies, and start the server from the repository root:

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r API/requirements.txt
uvicorn API.main:app --reload
```

The API will be available at `http://localhost:8000` by default. FastAPI's interactive documentation is available at `http://localhost:8000/docs`.

At startup, the API creates the `Orders` table if it does not already exist. Creating the table does not add menu items; insert products into PostgreSQL for them to appear in the menu.

## API endpoints

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/getTrips` | Returns active menu items. |
| `POST` | `/getCart` | Receives a list of IDs and returns the matching products. |

Example request body for `POST /getCart`:

```json
{
  "ids": [1, 2]
}
```

## Frontend scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the development server. |
| `pnpm build` | Builds the production version. |
| `pnpm preview` | Previews the production build locally. |
| `pnpm lint` | Runs Oxlint. |

## Project structure

```text
├── API/
│   ├── Databases/    # PostgreSQL connections and initialization
│   ├── Routers/      # API routes
│   ├── Schemas/      # Request models
│   └── main.py       # FastAPI application
├── src/
│   ├── Components/   # React components
│   ├── Requisitions/ # API requests
│   └── StylesGlobals/ # Global styles
├── index.html
└── package.json
```

## Contributing

Contributions are welcome. Open an issue to report a problem or suggest an improvement. To contribute code, submit a pull request.
