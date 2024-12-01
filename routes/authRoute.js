const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db/connection');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
    if (err) return res.status(500).send('Error registering user');
    res.redirect('/login.html');
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) return res.status(500).send('Error during login');
    
    if (results.length && await bcrypt.compare(password, results[0].password)) {
      req.session.user = results[0].username;
      res.redirect('/');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

router.get('/check-session', (req, res) => {
    if (req.session.user) {
      res.json({ isAuthenticated: true, username: req.session.user });
    } else {
      res.json({ isAuthenticated: false });
    }
});
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login.html');
});

module.exports = router;
