const express = require('express');
const path = require('path');

const session = require('express-session'); //Used for session control (user login/logout)

require('dotenv').config();
var mysql = require('mysql2');

const app = express();
const PORT = 3000;

const API_KEY = process.env.API_KEY;

app.use(session({
  secret: '2002-03-04-05',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

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
  res.sendFile(path.join(__dirname, 'public', 'Account', 'login.html'));
});


//For creating a user session (login)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  const sql = 'SELECT id FROM Users WHERE username = ? AND password = ?';

  con.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).send('Internal server error');
    }

    if (results.length > 0) {
      const userId = results[0].id;
      req.session.userId = userId;
      res.redirect('/');
    } else {
      res.status(401).send('Invalid username or password');
    }
  });
});

//For account creation
app.post('/create-account', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  const sql = "INSERT INTO Users (username, password, bio) VALUES (?, ?, 'bio')";
  con.query(sql, [username, password], function (err, result) {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).send("Error inserting data");
    }
    console.log("1 record inserted");
    res.sendFile(path.join(__dirname, 'public', 'Account', 'login.html'));
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