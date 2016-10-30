var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'vineethbabu',
    database: 'vineethbabu',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var pool = new Pool(config);
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/SmartBus.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'SmartBus.png'));
});

app.get('/ui/logo.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'logo.png'));
});

app.get('/businfo', function (req, res){
 pool.query('SELECT*FROM businfo',function(err,result){
     if(err){
         res.status(500).send(err.toString());
     }
         else
         {
             res.send(JSON.stringify(result.rows));
         }
     
 });
});

app.get('/businfo/:busno', function (req, res){
    
 pool.query("SELECT*FROM businfo WHERE busno= '" + req.params.busno+"'",function(err,result){
     if(err){
         res.status(500).send(err.toString());
     }
         else {
             if (result.row.length === 0)
         {
             res.status(404).send('Bus Info not found');
         }
         else{
             var busData=result.rows[0];
             res.send(createTemplate(busData));
         }
          }
     
 });
});

app.get('/bustwo', function (req, res){
 pool.query('SELECT*FROM bustwo',function(err,result){
     if(err){
         res.status(500).send(err.toString());
     }
         else
         {
             res.send(JSON.stringify(result.rows));
         }
     
 });
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
