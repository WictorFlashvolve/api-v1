const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

app.post('/api-v1', (req, res) => {
  const { email, phoneNumber } = req.body;
  const data = {
    email,
    phoneNumber,
  };
  res.status(201).json({ created: data });
});

/* === */
app.listen(3000, () => {
  'Server running ok';
});
