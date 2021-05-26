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

var computerRoute = require('./routes/computers');
app.use("/computers",computerRoute);

async function initConn() {
    try {
        await db.authenticate();
        console.log('Connection to database (Memory) has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database (Memory):', error);
    }
}
async function createTable() {
    try {
        await Computer.sync()
        console.log("Computers table created.")
    } catch (error) {
        console.log("Error creating Computers table", error);
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
                    console.log('CSV file successfully processed and loaded to database (Memory).');
                });
        });
    })





app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}.`);