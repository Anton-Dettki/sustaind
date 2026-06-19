# Coding Challenge: Mini-Rechtskataster

## Kontext

Bei Sustaind helfen Unternehmen dabei, rechtliche und nachhaltigkeitsbezogene Compliance zu managen. Ein zentraler Baustein ist das **Rechtskataster**: Unternehmen behalten den Überblick über relevante **Rechtsnormen** (z. B. Gesetze, Verordnungen) und die daraus abgeleiteten **Pflichten** — also konkrete To-dos wie „Dokumentation erstellen“ oder „Prozess anpassen“.

Für diese Challenge baust du eine **vereinfachte Version** dieses Konzepts: eine kleine Web-App, in der man Rechtsnormen einsehen und zugehörige Pflichten verwalten kann.

---

## Deine Aufgabe

Erstelle eine Full-Stack-Webanwendung mit:

- **Backend:** NestJS (TypeScript)
- **Frontend:** React (TypeScript) mit **TanStack Router** und **TanStack Query**
- **Datenhaltung:** In-Memory, JSON-Datei oder Postgres — du entscheidest

**Zeitrahmen:** Plane **3–5 Stunden** ein. Nicht mehr perfektionieren als nötig — ein lauffähiges MVP reicht.

Wichtig: Du musst nicht alle Punkte erfüllen — schau einfach, wie weit du kommst.

Schick uns bis Sonntag Abend einen invite zu deinem **öffentlichen oder privaten GitHub-Repository** ein. Das Repo soll lokal startbar sein (kurze README mit Setup-Schritten).

---

## Domäne (vereinfacht)

| Begriff | Bedeutung |
|--------|-----------|
| **Rechtsnorm** (*Legal Act*) | Ein Gesetz oder eine Verordnung, z. B. „Bundes-Immissionsschutzgesetz (BImSchG)“ |
| **Pflicht** (*Obligation*) | Eine konkrete Compliance-Aufgabe, die aus einer Rechtsnorm abgeleitet ist |
| **Status** | Wo steht die Pflicht? z. B. `open`, `in_progress`, `done` |
| **Jurisdiktion** | `DE`, `EU`, … |

---

## Funktionale Anforderungen (MVP)

### 1. Rechtsnormen anzeigen

- Liste von **Beispiel-Rechtsnormen** (siehe Seed-Daten)
- Pro Norm: Titel, Kurztitel, Jurisdiktion (`DE` / `EU`), Inkrafttretensdatum

### 2. Pflichten verwalten

- Pflichten sind genau einer Rechtsnorm zugeordnet
- Felder mindestens: **Titel**, **Beschreibung** (optional), **Status**
- **Anlegen** und **Bearbeiten** (Status-Update reicht als Minimum)
- **Liste oder Board-Ansicht** — du entscheidest die Darstellung

### 3. API + Frontend

- REST-API im NestJS-Backend
- React-Frontend konsumiert die API über TanStack Query
- Mindestens **2 Routen**, z. B. Übersicht Rechtsnormen, Pflichten-Übersicht

---

## Technische Leitplanken

- **TypeScript** durchgängig (FE + BE)
- Saubere Projektstruktur (Monorepo oder zwei Ordner — deine Wahl)
- Kein Auth, kein Deployment, keine KI nötig
- Fehlerbehandlung: API liefert sinnvolle HTTP-Statuscodes; Frontend zeigt Lade- und Fehlerzustände

**Du musst NestJS und React nicht vorher kennen.** Nutze die offiziellen Docs und Tutorials — genau das ist Teil der Challenge.

---

## Nice-to-haves (nur wenn Zeit bleibt)

- Filter nach Status oder Zuständigkeit
- Detailseite einer Rechtsnorm mit zugehörigen Pflichten
- Postgres mit drizzle statt In-Memory
- Einfache Validierung (z. B. Zod)
- Tests für einen Endpoint oder eine Komponente
- Grobe UI — kein Design-System nötig

---

## Seed-Daten

### Rechtsnormen

```json
[
  {
    "title": "Bundes-Immissionsschutzgesetz",
    "titleShort": "BImSchG",
    "jurisdiction": "DE",
    "enactmentDate": "1974-05-15"
  },
  {
    "title": "Verordnung über Anlagen zum Umgang mit wassergefährdenden Stoffen",
    "titleShort": "AwSV",
    "jurisdiction": "DE",
    "enactmentDate": "2017-04-18"
  },
  {
    "title": "Verordnung (EU) über die Registrierung, Bewertung, Zulassung und Beschränkung chemischer Stoffe",
    "titleShort": "REACH",
    "jurisdiction": "EU",
    "enactmentDate": "2006-12-18"
  },
  {
    "title": "Gesetz zum Schutz vor gefährlichen Stoffen",
    "titleShort": "ChemG",
    "jurisdiction": "DE",
    "enactmentDate": "2005-06-23"
  },
  {
    "title": "Richtlinie über die Bewertung und Begrenzung der Risiken von Stoffen",
    "titleShort": "CLP",
    "jurisdiction": "EU",
    "enactmentDate": "2008-12-16"
  }
]
```

### Pflichten

```json
[
  {
    "title": "Genehmigungsbedürftige Anlage nach BImSchG identifizieren",
    "legalActTitleShort": "BImSchG",
    "description": "Alle betrieblichen Anlagen erfassen und prüfen, ob eine immissionsschutzrechtliche Genehmigung erforderlich ist.",
    "status": "open"
  },
  {
    "title": "Emissionsüberwachung für genehmigte Anlagen einrichten",
    "legalActTitleShort": "BImSchG",
    "description": "Mess- und Überwachungskonzept für genehmigungspflichtige Anlagen erstellen und dokumentieren.",
    "status": "in_progress"
  },
  {
    "title": "AwSV-Registrierung für wassergefährdende Stoffe durchführen",
    "legalActTitleShort": "AwSV",
    "description": "Anlagen mit wassergefährdenden Stoffen beim zuständigen Gewässerschutzamt registrieren.",
    "status": "in_progress"
  },
  {
    "title": "Gefährdungsbeurteilung für AwSV-Anlagen aktualisieren",
    "legalActTitleShort": "AwSV",
    "description": "Bestehende Gefährdungsbeurteilungen prüfen und bei Änderungen der Lagerung oder Menge aktualisieren.",
    "status": "open"
  },
  {
    "title": "REACH-Konformitätserklärung für Importstoffe prüfen",
    "legalActTitleShort": "REACH",
    "description": "Sicherstellen, dass für alle importierten Stoffe > 1 t/Jahr die Registrierungspflichten erfüllt sind.",
    "status": "open"
  },
  {
    "title": "Sicherheitsdatenblätter für REACH-registrierte Stoffe beschaffen",
    "legalActTitleShort": "REACH",
    "description": "Aktuelle Sicherheitsdatenblätter von Lieferanten einholen und im Stoffregister hinterlegen.",
    "status": "done"
  },
  {
    "title": "Stoffregister gemäß ChemG führen",
    "legalActTitleShort": "ChemG",
    "description": "Alle im Betrieb verwendeten Gefahrstoffe erfassen und im zentralen Stoffregister dokumentieren.",
    "status": "open"
  },
  {
    "title": "Gefahrstoffbeauftragten benennen",
    "legalActTitleShort": "ChemG",
    "description": "Schriftlich benennen, dass mindestens eine Person mit den Aufgaben des Gefahrstoffbeauftragten betraut ist.",
    "status": "done"
  },
  {
    "title": "CLP-konforme Kennzeichnung aller Gemische prüfen",
    "legalActTitleShort": "CLP",
    "description": "Etikettierung und Verpackung aller im eigenen Betrieb hergestellten oder abgefüllten Gemische auf CLP-Konformität prüfen.",
    "status": "open"
  },
  {
    "title": "Einstufung und Kennzeichnung neuer Stoffe dokumentieren",
    "legalActTitleShort": "CLP",
    "description": "Für neu eingeführte Stoffe die Einstufung nach CLP durchführen und die Kennzeichnungspflichten ableiten.",
    "status": "in_progress"
  }
]
```

---

## Abgabe-Checkliste

- [ ] GitHub-Repo mit README (Voraussetzungen, `npm install` / `pnpm install`, Start-Befehle)
- [ ] Backend und Frontend lokal startbar
- [ ] Seed-Daten vorhanden
- [ ] Kurze Beschreibung: Was hast du umgesetzt? Was würdest du als Nächstes tun? (5–10 Sätze in der README reichen)

---

## Worauf wir achten

| Kriterium | Was wir schauen |
|-----------|-----------------|
| **Lauffähigkeit** | Startet die App? Kernflows funktionieren? |
| **Code-Qualität** | Lesbar, sinnvolle Struktur, TypeScript sinnvoll genutzt |
| **Domänenverständnis** | Rechtsnorm ↔ Pflicht sinnvoll modelliert? |
| **API-Design** | RESTful, konsistente DTOs |
| **Frontend** | TanStack Query für Server-State; Routing mit TanStack Router |
| **Kommunikation** | README klar? Entscheidungen nachvollziehbar? |
| **Pragmatismus** | MVP statt Over-Engineering im vorgegebenen Zeitrahmen |

---

## Hinweise

- **Scope:** Lieber ein kleines, fertiges MVP als ein halbfertiges Großprojekt.
- **Frameworks neu?** Das ist erwartet — Docs lesen, Tutorials folgen, loslegen.

Viel Erfolg — wir freuen uns auf dein Repo am Sonntagabend!