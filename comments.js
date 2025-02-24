// create web serwer with express
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

// read json file
let comments = JSON.parse(fs.readFileSync('comments.json'));

// create body-parser
app.use(bodyParser.json());

// get all comments
app.get('/comments', (req, res) => {
    res.send(comments);
});

// get comment by id
app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(comment => comment.id == id);
    if (comment) {
        res.send(comment);
    } else {
        res.status(404).send('Comment not found');
    }
});

// add new comment
app.post('/comments', (req, res) => {
    if (req.body.text && req.body.author) {
        const comment = {
            id: comments.length + 1,
            text: req.body.text,