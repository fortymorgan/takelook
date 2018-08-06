const express = require('express');
const path = require('path');

const app = express();

app.use('/static', express.static('static'));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, "static/index.html"));
});

app.listen(3000);
