process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');
// var express = require('./config/express');
var app = express();
app.listen(3000);
app.use(express.static("public"));//set static file path to public folder, so as to get img etc, href not affected
app.set('view engine', 'ejs');// set the view engine to ejs
app.use(require('./routes/index.routes')); //set location of the routes folders, to make res

module.exports = app;
console.log('Server running at http://localhost:3000/');
