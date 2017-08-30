var express = require('express');
var app = express();
var path = require('path')

app.use('/data', express.static(path.join(__dirname, './src/data')))

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("listening at http://%s:%s", host, port)
})