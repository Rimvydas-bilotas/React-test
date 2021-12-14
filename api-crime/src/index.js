const express = require('express');
const cors = require('cors');

const usersRouter = require('./routes/users');
const crimesRouter = require('./routes/crimes');
const townsRouter = require('./routes/towns');
const severitiesRouter = require('./routes/severities');

const { port } = require('./config');

const app = express();

app.use(express.json());
app.use(cors());
app.use(usersRouter, crimesRouter, townsRouter, severitiesRouter);

app.get('/', (req, res) => {
  res.send({ msg: 'Server is running' });
});

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Page not found' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
