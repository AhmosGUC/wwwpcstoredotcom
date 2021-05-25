'use strict';
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const express = require('express');
var cors = require('cors')
var bodyparser = require('body-parser')
const csv = require('csv-parser');
const fs = require('fs');
const db = require('./database');
const Computer = require('./model/computer');
// App
const app = express();
app.use(cors());
app.use(bodyparser.json());

async function initConn() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
async function createTable() {
    try {
        await Computer.sync()
        console.log("Created")
    } catch (error) {
        console.log("error", error);
    }
}
initConn()
    .then(() => {
        createTable().then(() => {
            fs.createReadStream('datastore/dataset.csv')
                .pipe(csv())
                .on('data', (row) => {
                    Computer.create(row).then().catch(err => {
                        console.log(err);
                    });
                })
                .on('end', () => {
                    console.log('CSV file successfully processed');
                });
        });
    })



app.get('/', (req, res) => {
    res.json({
        'message': 'Hello World'
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);