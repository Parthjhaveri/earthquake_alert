// IMPORT AND INITIALIZE EXPRESS
var express = require ('express');
var app = express();

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/src/index.html');
});

// TELL THE SERVER WHAT PORT TO LISTEN TO
app.listen(5000);
console.log('Working on 5000');