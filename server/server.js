const express = require('express');
const logger = require('./middlewares/logger');
const indexRoute = require('./routes/index');

const app = express();
const port = 3000;

// Middleware
app.use(logger);

// Routes
app.use('/', indexRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
