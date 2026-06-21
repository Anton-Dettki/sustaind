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
## Insights
### Persistent Storage
Neue Pflichten und Status-Änderungen werden per `fs` in `obligations.json` geschrieben — die Daten bleiben auch nach einem Server-Neustart erhalten.

Ich habe mich bewusst **gegen eine Datenbank** (z. B. Postgres mit Drizzle) entschieden. Für ein Projekt dieser Größe wäre das Setup, Schema, Migrations und Repository-Layer meiner Meinung nach **zu viel zusätzlicher Code**, der den Fokus von den interessanteren Teilen wegnimmt: API-Design, Frontend-Architektur mit TanStack, Validierung und UI. JSON-Dateien reichen hier vollkommen aus und halten das Backend schlank.

### Zod Validation
Per Zod wird die erstellung neuer Obligations folgenden Regeln validiert:
- Titel muss vorhanden sein (mindestens 1 character)
- shortTitle muss vorhanden sein
- description muss vorhanden sein
- Status muss entweder "open", "in_progress" oder "done" sein

### E2E Test
Für den Endpunkt POST /obligations/create habe ich einen E2E Test geschrieben. Dieser Test stellt sicher, dass neue Obligations auch wirklich persistent angelegt werden. 

Weiter sinnvolle Tests könnten z.B. leere Eingabefelder oder einen falschen Status beinhalten.

Der test kann mit dem command ausgeführt werden
```bash
cd backend
npm run test:e2e
npm run dev
```
