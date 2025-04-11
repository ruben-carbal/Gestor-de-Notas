const express = require('express');
const app = require('./controllers/notes.js');

app.set('view-engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}...`);
});
