const server = require('express');

const app = server();

let servArr= [];

const PORT = process.env.PORT || 5000;

app.use('/', server.static('./public'));

app.get('/add', function (req, res) {
    console.log(req.query.input);
    servArr.push(req.query.input);
    res.send(req.query);
});

app.get('/display', function (req, res) {
    res.send(servArr);
});

app.get('/delete', function (req, res) {
    servArr.splice(Number(req.query.index), 1);
    res.sendStatus(200);
});

app.get('/update', function (req, res) {
    console.log(req.query);
    servArr.splice(Number(req.query.index), 1, req.query.val.toString());
    res.sendStatus(200);
})

app.listen(PORT, function () {
    console.log("server running at port " + PORT);
});