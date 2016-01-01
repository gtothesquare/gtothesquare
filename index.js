var express = require ('express');
var app = new express();
var port =  process.env.PORT || 3000;


app.use(express.static('public'));
app.listen(port);


console.log('gtothesquare at port ' + port);