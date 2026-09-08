# fg-predictions

.NET 10 minimal API + React 19 / TypeScript frontend.

```
Backend/                 self-contained .NET solution root
  FgPredictions.slnx
  Directory.Packages.props
  Api/                   minimal API, vertical slices under Features/
  Api.UnitTests/
  Api.IntegrationTests/  Testcontainers-backed, runs against a real Postgres
Frontend/                Vite + React, proxies /api/* to the API in dev
```

## Setup

Assumes Docker is already running. Also needs the .NET 10 SDK, Node (see `.nvmrc`), and pnpm.

```bash
cp .env.example .env
docker compose up -d
dotnet tool install --global dotnet-ef
dotnet ef database update --project Backend/Api
cd Frontend && pnpm install
```

## Run

Two terminals:

```bash
dotnet run --project Backend/Api    # API + Scalar at https://localhost:7016/scalar
```

```bash
cd Frontend && pnpm dev             # open this URL, it proxies /api/* to the API
```

## Changing the API contract

`dotnet build Backend/Api` rewrites `Backend/Api/openapi.json`. Regenerate the frontend types
from it:

```bash
cd Frontend && pnpm gen:api         # rewrites src/lib/api/schema.d.ts
```

## Using your own database credentials

Edit `.env`, recreate the container with `docker compose down -v && docker compose up -d`, then
match `ConnectionStrings:Database` in `Backend/Api/appsettings.Development.json` to it.

## Notes

The `Conditions` and `Forecasts` slices are scaffolding examples — delete them along with their
tests and migrations once real features land.

`docker-compose.yml` pins the Compose project name to `fgp`, so container, volume, and network
names are stable regardless of what the checkout directory is called.
