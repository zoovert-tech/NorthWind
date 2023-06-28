var express = require("express");
var routerTest = express.Router();

const dbHelper = require('../models/PostGreSQL');

/* Prepare raw data */
function PrepareData(orderList, userData) {
    for (let i = 0; i < orderList.length; i++) {
        const data = orderList[i];

        userData.push({
            id: data.order_id,
            customer_id: data.customer_id,
            employee_id: data.employee_id,
            order_date: data.order_date,
            required_date: data.required_date,
            shipped_date: data.shipped_date,
            ship_via: data.ship_via,
            freight: data.freight,
            ship_name: data.ship_name,
            ship_address: data.ship_address,
            ship_city: data.ship_city,
            ship_region: data.ship_region,
            ship_postal_code: data.ship_postal_code,
            ship_country: data.ship_country
        });
    }
}

// load users table page 
routerTest.get('/OrdersTable', async function (req, res) {
    var orderLisData = new Array();

    dbHelper.OpenConnection();

    PrepareData(await dbHelper.GetAllFromTable('orders'), orderLisData);

    res.render('OrdersTable', { orderData: orderLisData });

    dbHelper.CloseConnnection();
});

module.exports = routerTest;