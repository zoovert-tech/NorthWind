var express = require("express");
var routerTest = express.Router();

const config = {
    host: "localhost",
    user: "postgres",
    password: "1234",
    database: "DbNorth",
    port: 5432,
    ssl: false,
};


/* Prepare raw data */
function PrepareData(userList, customers) {
    for (let i = 0; i < userList.length; i++) {
        const data = userList[i];

        customers.push({
            id: data.customer_id,
            company_name: data.company_name,
            contact_name: data.contact_name,
            contact_title: data.contact_title,
            address: data.address,
            city: data.city,
            region: data.region,
            postal_code: data.postal_code,
            country: data.country,
            phone: data.phone,
            fax: data.fax,
        });
    }
}

// load users table page 
routerTest.get('/CustomersTable', async function (req, res) {
    var customers = new Array();

    const dbHelper = require('../models/PostGreSQL');
    dbHelper.OpenConnection(config);

    PrepareData(await dbHelper.GetAllFromTable('customers'), customers);

    res.render('CustomersTable', { customersTable: customers });

    dbHelper.CloseConnnection();
});

routerTest.post('/CustomersTable', async function (req, res) {
    const q = `INSERT INTO public.customers( customer_id, company_name, contact_name, contact_title, address, city, region, postal_code, country, phone, fax) VALUES 
    ( 'id_id',${req.body.companyName}, ${req.body.contantName}, ${req.body.contactTitle}, ${req.body.address}, ${req.body.city},
        ${req.body.region}, ${req.body.postalCode}, ${req.body.countryCode}, ${req.body.phoneNumber}, ${req.body.faxNumber});`;

    const dbHelper = require('../models/PostGreSQL');
    dbHelper.OpenConnection(config);

    var qResult = await dbHelper.ExecuteQueryString(q);

    dbHelper.CloseConnnection();

    return res.json('allowReload');
});

module.exports = routerTest;