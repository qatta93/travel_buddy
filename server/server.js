const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 5500;

const app = express();
app.use(cors());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(port, () => console.log(`I am listening on port ${port}`));
