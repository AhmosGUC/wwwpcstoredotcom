'use strict';
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const express = require('express');
var cors = require('cors')
var bodyparser = require('body-parser')

// App
const app = express();
app.use(cors());
app.use(bodyparser.json());


app.get('/', (req, res) => {
    res.json({'message':'Hello World'});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);