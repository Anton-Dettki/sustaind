# Sustaind Rechtskataster

Vereinfachte Web-App zum Verwalten von **Rechtsnormen** und zugehörigen **Pflichten** — als Mini-Rechtskataster für Compliance-Aufgaben.

## Tech-Stack

- **Backend:** NestJS, TypeScript, JSON-Dateien als Datenspeicher
- **Frontend:** React, TypeScript, TanStack Router, TanStack Query, Tailwind CSS

## Voraussetzungen

- Node.js (LTS empfohlen)
- npm

## Lokales Setup

Backend und Frontend laufen in separaten Terminals.

### Backend

```bash
cd backend
npm install
npm run start:dev
```

API: [http://localhost:3001](http://localhost:3001)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App: [http://localhost:3000](http://localhost:3000)

Optional kann die API-URL über `VITE_API_BASE` gesetzt werden (Standard: `http://localhost:3001`).

## Funktionen

- Rechtsnormen anzeigen und nach **Land** sowie **Jahr** filtern
- Pflichten nach Rechtsnorm gruppiert anzeigen
- Pflichten-Status ändern (`open`, `in_progress`, `done`)
- Neue Pflichten per Dialog anlegen (mit Zod-Validierung)

## API-Endpunkte

| Methode | Pfad | Beschreibung |
|--------|------|--------------|
| `GET` | `/legal-acts` | Alle Rechtsnormen |
| `GET` | `/obligations` | Alle Pflichten |
| `PATCH` | `/obligations/:title` | Status aktualisieren |
| `POST` | `/obligations/create` | Neue Pflicht anlegen |

## Projektstruktur

```
backend/     NestJS-API, Seed-Daten in data/
frontend/    React-App (routes, components, lib, queries)
CHALLENGE.md Aufgabenstellung der Coding Challenge
```
