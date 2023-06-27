var express = require("express");
var routerTest = express.Router();

/* Prepare raw data */
function PrepareData(productsList, userData) {
    for (let i = 0; i < productsList.length; i++) {
        const data = productsList[i];

        userData.push({
            id: data.product_id,
            product_name: data.product_name,
            supplier_id: data.supplier_id,
            category_id: data.category_id,
            quantity_per_unit: data.quantity_per_unit,
            unit_price: data.unit_price,
            units_in_stock: data.units_in_stock,
            units_on_order: data.units_on_order,
            reorder_level: data.reorder_level,
            discontinued: data.discontinued
        });
    }
}

// load users table page 
routerTest.get('/ProductsTable', async function (req, res) {
    var productsList = new Array();

    const config = {
        host: "localhost",
        user: "postgres",
        password: "1234",
        database: "DbNorth",
        port: 5432,
        ssl: false,
    };

    const dbHelper = require('../models/PostGreSQL');
    dbHelper.OpenConnection(config);

    PrepareData(await dbHelper.GetAllFromTable('products'), productsList);

    res.render('ProductsTable', { productsList: productsList });
});

routerTest.post('/ProductsTable', function (req, res) {
    res.send('banned from POST backTest.js!');
});

module.exports = routerTest;