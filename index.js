const express = require('express')
var app = express();
var rout = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const port = process.env.PORT || 3000;

app.get('/', function (req, res) {

    res.sendFile(path.join(__dirname, '/site.html'));
});

var request = require('request');
// app.use(express.urlencoded())
app.post('/compilecode', function (req, res) {
    code: String;
    input: String;
    language: String;
    code = req.body.code;
    input = req.body.input;
    language = req.body.lang;
    var output = req.body.output;
    // console.log(req.body.code);
    var options = {
        'method': 'POST',
        'url': 'https://api.hackerearth.com/v3/code/run/',
        'headers': {
            'Cookie': 'HE_UTS_ID_CL=4fe5324c6aec4cb4ae3841cbb320ef2d11ab38fca4d8430383ba8b5801ab6024; csrftoken=9hsAw4xd8C25o3AE7eT0HQvKQdsse55fejoNjp3Ae5avFi4ZxiiykjQs0yQ7jvCw; HE_UTS_ID_LP="/v3/code/compile/"; HE_UTS_ID=37d8a4def7274375bc8a72dff1d172d13b1ea0de2295457b90daba26d2c8bba5; lordoftherings="a5dr3g48ag2dg8s2b8r57gkil6ioip74:56686a1ccdb890474620b30c07171d90"; piratesofthecaribbean='
        },
        formData: {
            'client_secret': '593e11682bfca5e7e767ceaa128aea958857e5dc',
            'async': '0',
            'source': code,
            'lang': language,
            'input': input,
            'time_limit': '5',
            'memory_limit': '262144'
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error.message);
        console.log(response.body);
        var my_output = JSON.parse(response.body);
        res.send("Output :\n" + my_output.run_status.output + "\nTime Used:" + my_output.run_status.time_used + "\nMemory Used: " + my_output.run_status.memory_used);
        //   res.send(document.getElementById("output").innerHTML = my_output);
    });
});
app.get('/', function (req, res) {
    document.getElementById('output').innerHTML = my_output.run_status.output;
});

app.listen(port);