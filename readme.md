for making path req:
npm i method-override

var express = require('express')
var methodOverride = require('method-override')
var app = express()
 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
Example call with query override using HTML <form>:

<form method="POST" action="/resource?_method=DELETE">
  <button type="submit">Delete resource</button>
</form>

for unique id :
npm i uuid
