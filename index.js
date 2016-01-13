var express = require ('express');
var ms = require('ms');
var app = new express();
var port =  process.env.PORT || 3000;


app.use(express.static('public', {
  maxAge: ms('365 days')
}));
app.listen(port);


console.log('gtothesquare at port ' + port);