const TARGET = 'https://script.google.com/macros/s/AKfycbwmjlLcZQTk2eRma6aj2CXcYsTam8B_VUw_wkkprwj7XkAi_y-_ngDys-AdeymM2bY/exec';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const qs = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  const options = { method: req.method, redirect: 'follow' };

  if (req.method === 'POST') {
    options.headers = { 'Content-Type': 'text/plain' };
    options.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
  }

  try {
    const r = await fetch(TARGET + qs, options);
    const text = await r.text();
    res.setHeader('Content-Type', 'application/json');
    res.status(r.status).send(text);
  } catch (err) {
    res.status(502).json({ ok: false, error: String(err) });
  }
};