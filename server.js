const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

// In-memory stores (swap for DB later)
let plants = [];
let schedules = [];
let waterings = [];

app.use(express.static(path.join(__dirname, 'public')));

// Plants
app.get('/api/plants', (req, res) => res.json(plants));
app.post('/api/plants', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  const plant = { id: Date.now().toString(), name, createdAt: new Date().toISOString() };
  plants.push(plant);
  res.status(201).json(plant);
});

// Watering schedules
app.get('/api/schedules', (req, res) => res.json(schedules));
app.post('/api/schedules', (req, res) => {
  const { plantId, frequencyDays, timeOfDay } = req.body;
  if (!plantId || !frequencyDays || !timeOfDay) return res.status(400).json({ error: 'plantId, frequencyDays and timeOfDay required' });
  const schedule = { id: Date.now().toString(), plantId, frequencyDays, timeOfDay, createdAt: new Date().toISOString() };
  schedules.push(schedule);
  res.status(201).json(schedule);
});

// Watering logs (manual or worker)
app.get('/api/waterings', (req, res) => res.json(waterings));
app.post('/api/waterings', (req, res) => {
  const { plantId, note } = req.body;
  if (!plantId) return res.status(400).json({ error: 'plantId required' });
  const entry = { id: Date.now().toString(), plantId, note: note || '', at: new Date().toISOString() };
  waterings.push(entry);
  res.status(201).json(entry);
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Plant Watering Reminder listening on http://localhost:${PORT}`));
