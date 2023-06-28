var express = require("express");
var routerTest = express.Router();

const dbHelper = require('../models/PostGreSQL');

/* Prepare raw data */
function PrepareData(suppliersList, userData) {
    for (let i = 0; i < suppliersList.length; i++) {
        const data = suppliersList[i];

        userData.push({
            id: data.supplier_id,
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
            homepage: data.homepage,
        });
    }
}

// load users table page 
routerTest.get('/SuppliersTable', async function (req, res) {
    var suppliersList = new Array();

    dbHelper.OpenConnection();

    PrepareData(await dbHelper.GetAllFromTable('suppliers'), suppliersList);

    res.render('SuppliersTable', { suppliersList: suppliersList });

    dbHelper.CloseConnnection();
});

routerTest.post('/SuppliersTable', function (req, res) {

});

module.exports = routerTest;