const express = require('express');
const { DatabaseSync } = require('node:sqlite');
const database = new DatabaseSync('notes.db');

const app = express();

app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

database.exec(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    note TEXT NOT NULL
    ) STRICT;`
);

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/notes', (req, res) => {
    const query = database.prepare(`SELECT * FROM notes`);
    const notes = query.all();

    res.send(notes.map(n => `<div><h2>${n.title}</h2><p>${n.note}</p></div>`));
});

app.get('/agregar-nota', (req, res) => {
    res.render("notes-form.ejs");
})

app.post('/notes', (req, res) => {
    console.log("request: ", req.body);
    const insert = database.prepare('INSERT INTO notes (title, note) VALUES(?,?)');
    insert.run(req.body.title, req.body.note);
    res.status(201).render('index.ejs');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`);
});
