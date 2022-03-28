const express = require('express');
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 5500;

const app = express();

app.use(cors());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(port, () => console.log(`I am listening on port ${port}`));
