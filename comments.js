// create web server with express
const express = require('express');
const app = express();
const port = 3000;

// get request
app.get('/', (req, res) => {
    res.send("Hello world");
});

// start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});