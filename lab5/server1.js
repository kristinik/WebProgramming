const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5002;

// Enable CORS and JSON parsing
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

let chainsaws = [
    { id: 1, title: 'Chainsaw A', power: 360, revolutions: 25600 },
    { id: 2, title: 'Chainsaw B', power: 150, revolutions: 34500 },
    { id: 3, title: 'Chainsaw C', power: 200, revolutions: 30000 },
];

// Route to get chainsaws list
app.get('/chainsaws', (req, res) => {
    res.json(chainsaws);
});

// Route to add a new chainsaw
app.post('/chainsaws', (req, res) => {
    const { title, power, revolutions } = req.body;
    const newChainsaw = {
        id: chainsaws.length + 1,
        title,
        power,
        revolutions,
    };
    chainsaws.push(newChainsaw);
    res.status(201).json(newChainsaw);
});

// Route to update chainsaw information
app.put('/chainsaws/:id', (req, res) => {
    const chainsawId = parseInt(req.params.id);
    const { title, power, revolutions } = req.body;

    const chainsaw = chainsaws.find(cs => cs.id === chainsawId);
    if (chainsaw) {
        chainsaw.title = title;
        chainsaw.power = power;
        chainsaw.revolutions = revolutions;
        res.json(chainsaw);
    } else {
        res.status(404).send('Chainsaw not found');
    }
});

// Route to delete a chainsaw
app.delete('/chainsaws/:id', (req, res) => {
    const chainsawId = parseInt(req.params.id);
    const chainsawIndex = chainsaws.findIndex(cs => cs.id === chainsawId);

    if (chainsawIndex !== -1) {
        chainsaws.splice(chainsawIndex, 1);
        res.status(204).send(); // No content
    } else {
        res.status(404).send('Chainsaw not found');
    }
});

// Route to count total revolutions
app.get('/chainsaws/count-revolutions', (req, res) => {
    const totalRevolutions = chainsaws.reduce((total, chainsaw) => total + chainsaw.revolutions, 0);
    res.json({ totalRevolutions });
});

// Route to sort chainsaws by power
app.get('/chainsaws/sort', (req, res) => {
    const sortedChainsaws = [...chainsaws].sort((a, b) => a.power - b.power);
    res.json(sortedChainsaws);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

// Route to search chainsaws by title
app.get('/chainsaws/search', (req, res) => {
    const searchTerm = req.query.q.toLowerCase();
    const filteredChainsaws = chainsaws.filter(chainsaw =>
        chainsaw.title.toLowerCase().includes(searchTerm)
    );
    res.json(filteredChainsaws);
});
