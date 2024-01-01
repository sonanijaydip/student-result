var mysql = require('mysql');
var express = require('express');
const { fail } = require('assert');

// 101/yash/99/98/97/96/95
// 102/radhe/90/80/70/60/50
// 103/yara/49/78/47/36/15
// 104/preet/99/99/99/96/95
// 105/ram/59/48/77/66/65
// 106/lakhan/19/18/17/16/5
// 107/bhuvan/55/78/97/56/35
// 108/dhanush/49/78/47/36/55
// 109/jaydop/09/08/07/06/05
// 110/mik/91/45/67/36/25


var app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project'
});

connection.connect();

app.get('/make_results/:rno/:name/:sub_1/:sub_2/:sub_3/:sub_4/:sub_5', function (req, res) {

    var rno = parseInt(req.params.rno);
    var name = req.params.name;
    var sub_1 = parseInt(req.params.sub_1);
    var sub_2 = parseInt(req.params.sub_2);
    var sub_3 = parseInt(req.params.sub_3);
    var sub_4 = parseInt(req.params.sub_4);
    var sub_5 = parseInt(req.params.sub_5);

    var total = sub_1 + sub_2 + sub_3 + sub_4 + sub_5;

    var avg = total / 5;

    var cnt = 0;
    var results = "";

    if (sub_1 < 35) {
        cnt++;
    }

    if (sub_2 < 35) {
        cnt++;
    }

    if (sub_3 < 35) {
        cnt++;
    }

    if (sub_4 < 35) {
        cnt++;
    }

    if (sub_5 < 35) {
        cnt++;
    }

    if (cnt == 0) {
        results = "PASS";
    }
    else if (cnt < 3) {
        results = "ATKT";
    }
    else {
        results = "FAIL";
    }


    var insert_que = "INSERT INTO `student_result`(`rno`, `name`, `sub_1`, `sub_2`, `sub_3`, `sub_4`, `sub_5`, `total`, `avg`, `results`) VALUES (' " + rno + " ',' " + name + " ',' " + sub_1 + " ',' " + sub_2 + " ',' " + sub_3 + " ',' " + sub_4 + " ',' " + sub_5 + " ', ' " + total + " ', ' " + avg + " ', '" + results + "')";

    connection.query(insert_que, function (err, results, field) {
        if (err) throw err;
        res.redirect('/student_result');
    });

});

app.get('/student_result', function (req, res) {

    var select_que = "SELECT * FROM `student_result`";

    connection.query(select_que, function (err, results, field) {
        if (err) throw err;
        res.send(results);
    });

});

app.get('/student_result/:id', function (req, res) {

    var id = req.params.id;

    var select_one = "SELECT * from `student_result` where `id` =" + id;

    connection.query(select_one, function (err, results, field) {
        if (err) throw err;
        res.send(results);
    });

});

app.get('/student_result/results/:results', function (req, res) {

    var results = req.params.results;

    var select_two = "SELECT * FROM `student_result` where `results` =  ( '" + results + "' )";

    connection.query(select_two, function (err, results, field) {
        if (err) throw err;
        res.send(results);
    });

});

app.get('/student_result/student/top5', function (req, res) {

    var rank;

    var select_three = "SELECT * FROM `student_result` ORDER BY `total` DESC LIMIT 5";

    connection.query(select_three, function (err, results, field) {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/student_result/update/:id/:sub_1/:sub_2/:sub_3/:sub_4/:sub_5', function (req, res) {

    var id = parseInt(req.params.id);
    var sub_1 = parseInt(req.params.sub_1);
    var sub_2 = parseInt(req.params.sub_2);
    var sub_3 = parseInt(req.params.sub_3);
    var sub_4 = parseInt(req.params.sub_4);
    var sub_5 = parseInt(req.params.sub_5);

    var total = sub_1 + sub_2 + sub_3 + sub_4 + sub_5;

    var avg = total / 5;

    var cnt = 0;
    var results = "";

    if (sub_1 < 35) {
        cnt++;
    }

    if (sub_2 < 35) {
        cnt++;
    }

    if (sub_3 < 35) {
        cnt++;
    }

    if (sub_4 < 35) {
        cnt++;
    }

    if (sub_5 < 35) {
        cnt++;
    }

    if (cnt == 0) {
        results = "PASS";
    }
    else if (cnt < 3) {
        results = "ATKT";
    }
    else {
        results = "FAIL";
    }


    var update_marks = "UPDATE `student_result` SET `sub_1`='"+sub_1+"',`sub_2`='"+sub_2+"',`sub_3`='"+sub_3+"',`sub_4`='"+sub_4+"',`sub_5`='"+sub_5+"',`total`='"+total+"',`avg`='"+avg+"',`results`='"+results+"' WHERE `id` = "+id;

    connection.query(update_marks, function (err, results, field) {
        if (err) throw err;
        res.send(results);
    });
});


app.listen(2000);