// create web serwer
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.get('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file from disk:', err);
            return;
        }
        try {
            const comments = JSON.parse(data);
            res.send(comments);
        } catch (err) {
            console.log('Error parsing JSON string:', err);
        }
    });
});

app.post('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading file from disk:', err);
            return;
        }
        try {
            const comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile('comments.json', JSON.stringify(comments), 'utf8', (err) => {
                if (err) {
                    console.log('Error writing file:', err);
                    return;
                }
            });
            res.send(comments);
        } catch (err) {
            console.log('Error parsing JSON string:', err);
        }
    });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});