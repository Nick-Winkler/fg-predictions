# fg-predictions

.NET 10 minimal API + React 19 / TypeScript frontend.

## Setup

Assumes Docker is already running. Also needs the .NET 10 SDK, Node (see `.nvmrc`), and pnpm.

```bash
cp .env.example .env
docker compose up -d
dotnet tool install --global dotnet-ef
dotnet ef database update --project api
cd web && pnpm install
```

## Run

Two terminals:

```bash
dotnet run --project api    # API + Scalar at https://localhost:7016/scalar
```

```bash
cd web && pnpm dev          # open this URL, it proxies /api/* to the API
```

## Using your own database credentials

Edit `.env`, recreate the container with `docker compose down -v && docker compose up -d`, then
match `ConnectionStrings:Database` in `api/appsettings.Development.json` to it.
