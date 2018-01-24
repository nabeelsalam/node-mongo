const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const routes = require('./routes');

const PORT = 8090;

routes(app);

app.listen(PORT, () => {
  console.log('Server running at', PORT);
});

