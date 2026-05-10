# Plant Watering Reminder

Minimal scaffold for reminding and logging plant waterings.

Quick start

1. Install dependencies:

```bash
npm install
```

2. Run the app:

```bash
npm start
# open http://localhost:3002
```

What is included

- `server.js` — Express server with in-memory stores and APIs:
  - `GET /api/plants`, `POST /api/plants`
  - `GET /api/schedules`, `POST /api/schedules`
  - `GET /api/waterings`, `POST /api/waterings`
- `public/index.html` + `public/app.js` — simple frontend to add plants, schedule waterings and log waterings

Notes

- This scaffold uses in-memory arrays; use a database and background worker for production reminders.
# Plant Watering Reminder

A reminder app for keeping houseplants on schedule.

- Target user: plant owners with multiple care routines
- MVP: create plants, set watering cadence, send reminders
- Nice next step: care tips by plant type
