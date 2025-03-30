const express = require('express');
const sqlite = require('node:sqlite');
const database = new DatabaseSync(':memory:');

const app = express();

app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/public'));

database.exec('CREATE TABLE notes (id INTEGER PRIMARY KEY AUTO INCREMENT, note TEXT)');

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.post('/notes', (req, res) => {
    const insert = database.prepare('INSERT INTO notes (note) VALUES(?)');

})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`);
})
