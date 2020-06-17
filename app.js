const express = require('express');
require('dotenv').config();
const app = express();
const connection = require('./src/helpers/mysql');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./src/routes/index');
// const cors = require('cors');



//connect to data base
connection.connect(function(error){
    if(error)throw error;
    console.log(`Database has connected!`);
});

//CORS Security Mechanism
// app.use(cors());
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//using morgan for error and success logging
app.use(morgan('dev'));
//use body-parser to send json data to node api project.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/', routes)

app.listen(3000, function(){
    console.log(`books-library-api running at port 3000...`)
});