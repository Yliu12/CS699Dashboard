
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'csor12c.dhcp.bsu.edu',
  user     : 'yliu12',
  password : '1234',
  database : 'cs699'
});
 console.log ("try Connection")
connection.connect();
console.log ("try Connection")

connection.query('select DISTINCT MR_MAC, MR_IP from mac_report2 where MR_USERNAME = "swu"', function (error, results, fields) {
  if (error) throw error;
  console.log ("Find Result")

  console.log('The solution is: ', results);
});

//connection.end();
