const express = require('express');
const { DatabaseSync } = require('node:sqlite');
const database = new DatabaseSync('notes.db');

const app = express();

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

    const notasHtml = notes.map(n =>
        `<div>
            <h2>${n.title}</h2>
            <p>${n.note}</p>
            <button 
                hx-delete="/delete-note/${n.id}"
                hx-confirm="¿Seguro que desea borrar la nota?"
                hx-on:htmx:afterRequest="location.reload()" >x</button>
        </div>`
    ).join('');

    res.send(notasHtml);
});

app.get('/agregar-nota', (req, res) => {
    res.render("notes-form.ejs");
});

app.get('/update-notes', (req, res) => {
    res.render('update-notes.ejs');
})

app.post('/notes', (req, res) => {
    const insert = database.prepare('INSERT INTO notes (title, note) VALUES(?,?)');
    insert.run(req.body.title, req.body.note);
    res.status(201).render('index.ejs');
});

app.delete('/delete-note/:id', (req, res) => {
    const id = req.params.id;
    const query = database.prepare('DELETE FROM notes WHERE id=?');
    query.run(id);
    res.status(204).end();
});

app.put('/update-note/:id', (req, res) => {
    const id = req.params.id;
    const title = req.params.title;
    const note = req.params.note;

    console.log('contenido de la nota: ', id, title, note);
})

module.exports = app;
