const express = require('express')
var http = require('http'),
    url = require('url'),
    fs = require('fs');
var cors = require('cors');
var md5 = require('md5');

const app = express();
var bodyParser = require('body-parser');
var messages = require('./messages-util');

app.use(cors());
app.use(bodyParser());

console.log('Server running.');

// app.get('/', function (req, res) {
//     fs.readFile('./client/index.html', function (err, data) {
//         res.end(data);
//     });
// });
app.post('/md5', function (req, res) {
    var email = req.body.email;
    var md5Hash
});

app.get('/messages', function (req, res, next) {

    if (!req.query.count || isNaN(req.query.count)) {
        var err = new Error('Not Found');
        err.status = 400;
        next(err);
    }
    else {
        messages.getMessages(req, res);
    }
});

app.get('/subscribe', function (req, res) {
    messages.subscribe(req, res);
});

app.post('/messages', function (req, res) {
    messages.addMessage(req, res);
});

app.delete('/messages/:id', function (req, res) {
    messages.deleteMessage(req, res);
});

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


app.listen(9000, function () {
    console.log('listening on port 9000!')
});