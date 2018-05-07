const express = require("express");
const morgan = require("morgan");
var path = require("path");

var app = express();
const port = process.env.PORT || 1111;


const db = require("../db/mysql");

app.use(morgan("combined"));
//app.use(express.static(path.join(__dirname, "..", "public"))); // set the static files location /public/img will be /img for users
console.log(__dirname);
app.use("/assets", express.static(path.join(__dirname, "../public/clearmin-master/demo/assets")));
app.use(express.static(path.join(__dirname, "../public/clearmin-master/demo")));

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname , "../public/clearmin-master/demo/dashboard-sales.html"));
//     //res.render("selectschool.html");
// });
Object.values = (obj) => Object.keys(obj).map(key => obj[key]);


db.init(function () {
    console.log(1);

    app.listen(port); //database is initialized, ready to listen for connections

});


app.get("/keyvals", (req, res) => {


    db.conn.query("SELECT * FROM yliu12.processed_data;", function (err, resData) {
        if (err) {
            res.status(500);
            res.send(err);
        }
        result = {};

        if (resData) {
            resData.forEach(function (value, index) {
                result[value.RECORD_KEY] = value.RECORD_VALUE.toUpperCase();

            });
        }


        res.status(200);
        res.send(result);
        console.log("Result: " + JSON.stringify(result, null, 2));
    });


});

app.get("/checkinforhistogram", (req, res) => {


    db.conn.query("SELECT * FROM yliu12.hourly_summary3;", function (err, resData) {
        if (err) {
            res.status(400);
            res.send(err);
        }
        result = [];
        list1 = ["Device"];
        list2 = ["User"];
        result.push(list1);
        result.push(list2);
        resData.forEach(function (value, index) {
            list1.push(value.DEVICE_COUNT);
            list2.push(value.USER_COUNT);

        });


        res.status(200);
        res.send(result);
        console.log("Result: " + JSON.stringify(result, null, 2));
    });


});
app.get("/nodeviceused", (req, res) => {


    db.conn.query("select * from yliu12.NO_OF_DEVICE_USED order by USER_COUNT desc;", function (err, resData) {
        if (err) {
            res.status(400);
            res.send(err);
        }
        result = [];

        resData.forEach(function (value, index) {
            result.push([value.DEVICE_RANGE, value.USER_COUNT]);
        });


        res.status(200);
        res.send(result);
        console.log("Result: " + JSON.stringify(result, null, 2));
    });


});
app.get("/buildingSummary", (req, res) => {


    db.conn.query("select * from yliu12.building_summary;", function (err, resData) {
        if (err) {
            res.status(400);
            res.send(err);
        }
        result = [];
        console.log(resData);

        resData.forEach(function (value, index) {
            result.push([value.BUILDING, value.USER_COUNT]);
        });


        res.status(200);
        res.send(result);
        console.log("Result: " + JSON.stringify(result, null, 2));
    });


});