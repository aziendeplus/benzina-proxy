import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

// Proxy per i prezzi: GET /prezzo?lat=...&lng=...
app.get('/prezzo', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'lat and lng query params required' });
  }
  try {
    const url = `https://carburanti.mise.gov.it/ospzServices/searchByLocation?lat=${lat}&lng=${lng}&raggio=1`;
    const r = await fetch(url);
    const data = await r.json();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'proxy_error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Proxy listening on port', PORT));
