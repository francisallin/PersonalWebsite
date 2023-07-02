process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.listen(3000);
app.use(bodyParser.urlencoded({extended:true})); //state that req.body contain values of any type instead of just strings
app.use(bodyParser.json()); //look for json in req.body and transform json to JS-accessible var
app.use(express.static("public"));//set static file path to public folder, so as to get img etc, href not affected
app.set('view engine', 'ejs');// set the view engine to ejs
app.use(require('./routes/index.routes')); //set location of the routes folders, to make res

module.exports = app;
console.log('Server running at http://localhost:3000/');
