const express = require('express');
const { DatabaseSync } = require('node:sqlite');
const database = new DatabaseSync('notes.db');

const app = express();

app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/public'));

database.exec(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    note TEXT
    ) STRICT;`
);

app.get('/', (req, res) => {
    res.render('index.ejs');
    const query = database.prepare(`SELECT * FROM notes`);
    console.log(query.all());
});

app.post('/notes', (req, res) => {
    const insert = database.prepare('INSERT INTO notes (note) VALUES(?)');
    insert.run('Esta es mi primera nota');
    res.status(201);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`);
});
