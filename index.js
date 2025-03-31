const express = require('express');
const { DatabaseSync } = require('node:sqlite');
const database = new DatabaseSync('notes.db');

const app = express();

app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/public'));

database.exec(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(50) NOT NULL,
    note TEXT NOT NULL
    ) STRICT;`
);

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/notes', (req, res) => {
    const query = database.prepare(`SELECT * FROM notes`);
    const notes = query.all();

    res.send(notes.map(n => `<h2>${n.title}</h2><p>${n.note}</p>`));
});

app.get('/agregar-nota', (req, res) => {
    res.render("notes-form.ejs");
})

app.post('/notes', (req, res) => {
    const insert = database.prepare('INSERT INTO notes (title, note) VALUES(?,?)');
    insert.run('nota', 'Esta es mi primera nota');
    res.status(201);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`);
});
