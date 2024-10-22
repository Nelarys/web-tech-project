const express = require('express');
const path = require('path');
require('dotenv').config();
var mysql = require('mysql2');

const app = express();
const PORT = 3000;

const API_KEY = process.env.API_KEY;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/get-api-key', (req, res) => {
  res.json({ apiKey: API_KEY });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/account', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Account', 'index.html'));
});

app.post('/api/login', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  var sql = "INSERT INTO Users (id, username, password, bio) VALUES (10, ?, ?, 'Dit is een test bio')";
  con.query(sql, [username, password], function (err, result) {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).send("Error inserting data");
    }
    console.log("1 record inserted");
    res.sendFile(path.join(__dirname, 'public', 'Account', 'index.html'));
  });
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
});