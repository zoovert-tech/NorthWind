const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

// Route files
const indexRoute = require('./routes/index');
const userTableRoute = require('./routes/UsersTable');
const categoriesTableRoute = require('./routes/CategoriesTable');
const customersTableRoute = require('./routes/CustomersTable');
const ordersTableRoute = require('./routes/OrdersTable');
const productsTableRoute = require('./routes/ProductsTable');
const suppliersTableRoute = require('./routes/SuppliersTable');

// Create a express application
var app = express();

// Register folders
app.set('views', __dirname + '/views');
app.use(express.static("public"));

// Set render view engine
app.set('view engine', 'ejs');

// Set
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/views')));

// Add routes
app.use('/', indexRoute);
app.use('/', userTableRoute);
app.use('/', categoriesTableRoute);
app.use('/', customersTableRoute);
app.use('/', ordersTableRoute);
app.use('/', productsTableRoute);
app.use('/', suppliersTableRoute);

// Launch server
app.listen(3001);

// For fast access to server
console.log('server listening on http://localhost:3001/');