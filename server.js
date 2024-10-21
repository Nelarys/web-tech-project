const express = require('express');
const path = require('path');
require('dotenv').config();
var mysql = require('mysql');

const app = express();
const PORT = 3000;

const API_KEY = process.env.API_KEY;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/get-api-key', (req, res) => {
  res.json({ apiKey: API_KEY });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "Testing"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO Users (id, username, password, bio) VALUES (1, 'balzakboris', '123', 'Dit is een bio')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});