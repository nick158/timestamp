var express = require('express');
//date format library
var dateformat = require('dateformat');
var app = express();
//get port
app.set('port', (process.env.PORT || 5000));
//checks if unix
function isUnix(res, date){
  //check if number
  if(isFinite(date)){
    //return object
    var object = {};
    object.unix = date;
    //changes number into date
    var natural = new Date(Number(date));
    //format date and make it object property
    object.natural = dateformat(natural, "mmmm dS, yyyy");
    //send json object
    res.json(object);
    //end response
    res.status(200).end()
  }
  return;
}
//checks if date string
function isDateString(res, date){
  var unixDate = new Date(date).getTime()/1000;
  if(!isNaN(unixDate)){
    var object = {};
    object.unix = unixDate;
    object.natural = date;
    res.json(object);
    res.end()
    res.status(200).end();
  }
  return;
}
//if not either, send null back
function failure(res){
  var object = {}
  object.unix = null;
  object.natural = null;
  
  res.json(object);
  res.end();
  res.status(200).end();
}
//get request with parameters
app.get('/', function(req, res){
  res.end();
  return;
});
app.get('/:datestring', function(req, res){
  //access the parameter
  var datestring = req.params.datestring;
//call functions to test parameter
  isUnix(res, datestring);
  isDateString(res, datestring);
  failure(res);
  res.end();
  return;
});
//listen to port with message on start
app.listen(app.get("port"), function(){
  console.log("Timestamp now listening on port", app.get('port'));
})