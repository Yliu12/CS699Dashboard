const mysql = require('mysql');
const fs = require("fs");


init = (callback) => {
    //    console.log(process.cwd());
    var line = fs.readFileSync('./db/mysql.conf');
    var config = JSON.parse(line);
    console.log(config.host);

    var connection = mysql.createConnection(config);

    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        //connection.query("SELECT * FROM yliu12.hourly_summary1;", function (err, result) {
            if (err) throw err;
            console.log("Result: " + JSON.stringify(result, null, 2));
        });
    });

    module.exports.conn = connection;
    callback()
};


//connection.end();

module.exports = {init};
