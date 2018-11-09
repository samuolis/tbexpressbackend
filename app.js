'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var usersRouter = require('./routes/userRouter');

const gstore = require('gstore-node')();
const Datastore = require('@google-cloud/datastore');

const datastore = new Datastore({
    projectId: 'trainingbuddy-221215',
});

gstore.connect(datastore);

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('labas'));


app.use('/users', usersRouter);

app.listen(8080, () => console.log('Example app listening on port 8080!'));

module.exports = app;
