var express = require('express')
var router = express.Router()
const {
    Op
} = require("sequelize");
const Computer = require('../model/computer');


router.get('/', (req, res) => {
    const limit = req.query.limit || 10
    const page = req.query.page || 1
    const offset = (page - 1) * limit;

    Computer.findAndCountAll({
        offset: offset,
        limit: limit
    }).then((result) => {
        let data = result.rows;
        let amount = result.count;
        res.json({
            result: data,
            count: limit,
            totalCount: amount
        });
    })

});
router.get('/company', (req, res) => {
    Computer.aggregate('Company', 'DISTINCT', {
        plain: false
    }).then((result) => {
        let data = [];
        result.forEach(element => {
            data.push(element['DISTINCT']);
        });
        res.json({
            'count': data.length,
            'companies': data
        });
    });
});
router.get('/product', (req, res) => {
    Computer.aggregate('Product', 'DISTINCT', {
        plain: false
    }).then((result) => {
        let data = [];
        result.forEach(element => {
            data.push(element['DISTINCT']);
        });
        res.json({
            'count': data.length,
            'products': data
        });
    });
});
router.get('/cpu', (req, res) => {
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
router.get('/ram', (req, res) => {
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
router.get('/opsys', (req, res) => {
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
router.get('/inches', (req, res) => {
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

router.get('/search', (req, res) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const company = req.query.company || "";
    const product = req.query.product || "";


    Computer.findAndCountAll({
        offset: offset,
        limit: limit,
        where: {
            Company: {
                [Op.like]: '%' + company.toLocaleLowerCase() + '%'
            },
            Product: {
                [Op.like]: '%' + product.toLocaleLowerCase() + '%'
            }
        }
    }).then((result) => {
        let amount = result.count;
        let data = result.rows;
        res.json({
            result: data,
            count: data.length,
            totalCount: amount
        });
    })

});

module.exports = router