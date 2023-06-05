const express = require('express');
const path = require('path');
const app = express();
const port = 4200;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.use(express.static(path.join(__dirname + '/../dist/pivot-angular')));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/pivot-angular/index.html'));
});

app.get('/with-amcharts', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/pivot-angular/index.html'));
});

app.get('/using-api-calls', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/pivot-angular/index.html'));
});

app.get('/customizing-grid', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/pivot-angular/index.html'));
});

app.get('/customizing-toolbar', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/pivot-angular/index.html'));
});


app.get('/pivot-table-demo', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/pivot-angular/index.html'));
});


app.get('/handling-events', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/pivot-angular/index.html'));
});

app.get('/with-highcharts', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/pivot-angular/index.html'));
});

app.get('/updating-data', function (req, res) {
    res.sendFile(path.join(__dirname, '/../dist/pivot-angular/index.html'));
});