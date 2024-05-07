const express = require('express');
const routes = require('./src/routes/routes');
const connectDB = require('./src/database/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', routes);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});