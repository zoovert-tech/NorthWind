var express = require("express");
var route = express.Router();

/* 
    Get
*/
route.get('/', function (req, res) {
    // Set base html page for rendering
    res.render('index');
});

/* 
    Post
*/
route.post('/index', async function (req, res) {
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

    var result = await dbHelper.TryFindUser(req.body.login, req.body.password);
    if (result == -1) {
        console.log(`User with ${req.body.login} username not found in DataBase!`);

        // User enter incorrect data!
        return res.json('forbidden');
    }
    else {
        console.log('User is found!');

        // Alloow redirect
        return res.json('allow_redirect');
    }
});

module.exports = route;