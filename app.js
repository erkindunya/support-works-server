const powershell = require('node-powershell')
const fs = require('fs');
const express = require('express');
const bodyparser = require('body-parser');


const app = express();
const port = 3000;

const ps = new powershell({
    executionPolicy: 'Bypass',
    noProfile: true
});

const path = "C:\\Users\\grant.tapp\\Desktop\\testing.ps1";

app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());

app.post('/', (req, res) => {
    let params = req.body;

    fs.readFile(path, "utf8", (err, data) => {
        ps.addCommand(data, [{Data: params.data}]);
        ps.invoke()
            .then(data => console.log(data))
            .catch(error => console.log(error))
    });

    res.send(`You sent me ${params.data}`)

});


app.listen(port, (data) => {})