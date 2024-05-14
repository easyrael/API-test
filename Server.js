const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let db = [];

app.post('/', (req, res) => {
    const { title, comedian, year } = req.body;
    const id = db.length + 1;
    const newJoke = { id, title, comedian, year };
    db.push(newJoke);
    res.json(db);
});

app.get('/', (req, res) => {
    res.json(db);
});

app.patch('/joke/:id', (req, res) => {
    const id = req.params.id;
    const { title, comedian, year } = req.body;
    const jokeIndex = db.findIndex(joke => joke.id == id);
    if (jokeIndex !== -1) {
        db[jokeIndex] = { ...db[jokeIndex], title, comedian, year };
        res.json(db[jokeIndex]);
    } else {
        res.status(404).json({ message: "Joke not found" });
    }
});

app.delete('/joke/:id', (req, res) => {
    const id = req.params.id;
    const jokeIndex = db.findIndex(joke => joke.id == id);
    if (jokeIndex !== -1) {
        const deletedJoke = db.splice(jokeIndex, 1);
        res.json(deletedJoke[0]);
    } else {
        res.status(404).json({ message: "Joke not found" });
    }
});

app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});
