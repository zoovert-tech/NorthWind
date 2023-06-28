var express = require("express");
var routerTest = express.Router();

const dbHelper = require('../models/PostGreSQL');

/* Prepare raw data */
function PrepareData(userList, userData) {
    for (let i = 0; i < userList.length; i++) {
        const data = userList[i];

        userData.push({
            id: data.category_id,
            name: data.category_name,
            description: data.description,
            picture: data.picture
        });
    }
}

// load users table page 
routerTest.get('/CategoriesTable', async function (req, res) {
    var catListData = new Array();

    const dbHelper = require('../models/PostGreSQL');
    dbHelper.OpenConnection();

    PrepareData(await dbHelper.GetAllCategories(), catListData);

    res.render('CategoriesTable', { categoriesData: catListData });

    dbHelper.CloseConnnection();
});

routerTest.post('/CategoriesTable', async function (req, res) {
    const q = `INSERT INTO public.categories(category_name, description, picture) VALUES (${req.body.name}, ${req.body.desc}, '');`;

    dbHelper.OpenConnection();

    var qResult = await dbHelper.ExecuteQueryString(q);

    dbHelper.CloseConnnection();

    return res.json('allowReload');
});

routerTest.post('/CategoriesTableDelete', async function (req, res) {
    const q = `DELETE FROM public."categories" WHERE "category_id" = ${req.body.id}`;

    dbHelper.OpenConnection();

    var qResult = await dbHelper.ExecuteQueryString(q);

    dbHelper.CloseConnnection();

    return res.json('allowReload');
});

module.exports = routerTest;