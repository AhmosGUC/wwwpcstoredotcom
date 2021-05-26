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



app.get('/computers', (req, res) => {
    const limit = req.query.limit || 10
    const page = req.query.page || 1
    const offset = (page - 1) * limit;
    Computer.count().then((amount) => {
        Computer.findAll({
            offset: offset,
            limit: limit
        }).then((result) => {
            res.json({
                result: result,
                count: limit,
                totalCount: amount
            });
        })
    })
});

app.get('/computers/cpu', (req, res) => {
    Computer.aggregate('CPU', 'DISTINCT', {
        plain: false
    }).then((result) => {
        let data = [];
        result.forEach(element => {
            data.push(element['DISTINCT']);
        });
        res.json({
            'count': data.length,
            'cpus': data
        });
    });
});
app.get('/computers/ram', (req, res) => {
    Computer.aggregate('RAM', 'DISTINCT', {
        plain: false
    }).then((result) => {
        let data = [];
        result.forEach(element => {
            data.push(element['DISTINCT']);
        });
        res.json({
            'count': data.length,
            'rams': data
        });
    });
});
app.get('/computers/opsys', (req, res) => {
    Computer.aggregate('OpSys', 'DISTINCT', {
        plain: false
    }).then((result) => {
        let data = [];
        result.forEach(element => {
            data.push(element['DISTINCT']);
        });
        res.json({
            'count': data.length,
            'opsys': data
        });
    });
});
app.get('/computers/inches', (req, res) => {
    Computer.aggregate('Inches', 'DISTINCT', {
        plain: false
    }).then((result) => {
        let data = [];
        result.forEach(element => {
            data.push(element['DISTINCT']);
        });
        res.json({
            'count': data.length,
            'inches': data
        });
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}.`);