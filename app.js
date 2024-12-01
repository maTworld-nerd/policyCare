const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet')
const policyRoute = require('./routes/policyRoute');
const pool = require('./db/connection');

const app = express();

// Security Middleware
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Parsing Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/simulate-policy', policyRoute);

// Database connection
const fetchPolicies = async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM policies');
      console.log('Policies:', rows);
    } catch (err) {
      console.error('Database query failed:', err);
    }
  };
  
  fetchPolicies();

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
// start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
