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
function PrepareData(userList, userData) {
  for (let i = 0; i < userList.length; i++) {
    const data = userList[i];

    userData.push({
      id: data.userID,
      login: data.Login,
      password: data.Password
    });
  }
}

// load users table page 
routerTest.get('/usersTable', async function (req, res) {
  var userData = new Array();

  const dbHelper = require('../models/PostGreSQL');
  dbHelper.OpenConnection(config);

  // prepare user list for rendering on page
  PrepareData(await dbHelper.GetAllUsers(), userData);

  dbHelper.CloseConnnection();

  res.render('usersTable', { userData: userData });
});

routerTest.post('/usersTable', async function (req, res) {
  const q = `INSERT INTO public."Users"("Login", "Password") VALUES ('${req.body.login}','${req.body.password}');`;

  const dbHelper = require('../models/PostGreSQL');
  dbHelper.OpenConnection(config);

  var qResult = await dbHelper.ExecuteQueryString(q);

  dbHelper.CloseConnnection();

  return res.json('allowReload');
});

routerTest.post('/usersTableDelete', async function (req, res) {
  const q = `DELETE FROM public."Users" WHERE "userID" = ${req.body.id}`;

  const dbHelper = require('../models/PostGreSQL');
  dbHelper.OpenConnection(config);

  var qResult = await dbHelper.ExecuteQueryString(q);

  dbHelper.CloseConnnection();

  return res.json('allowReload');
});

module.exports = routerTest;