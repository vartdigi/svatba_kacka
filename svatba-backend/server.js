// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const handleVote = (category, option) => {
  // Odeslání volby na backend
  fetch('http://localhost:5001/votes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category, option }),
  })
    .then((response) => response.json())
    .then((updatedVotes) => {
      setVotes(updatedVotes); // Aktualizace stavových dat
    })
    .catch((error) => {
      console.error('Error updating vote:', error);
    });
};
// Umožníme připojení mezi frontendem a backendem (CORS)
app.use(cors());

// Povolíme serveru zpracovávat JSON data
app.use(express.json());

// Připojení k databázi (MongoDB)
mongoose
  .connect('mongodb://localhost:27017/svatba')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// Model pro ukládání hlasů
const voteSchema = new mongoose.Schema({
  prijezd: {
    obrad: Number,
    party: Number,
    celyDen: Number,
    neprijdu: Number,
  },
  spani: {
    ne: Number,
    autoStan: Number,
    zaplatim: Number,
  },
  jidlo: {
    vegetarian: Number,
  },
});

const Vote = mongoose.model('Vote', voteSchema);

// API endpoint pro získání aktuálních výsledků hlasování
app.get('/votes', async (req, res) => {
  try {
    const voteResults = await Vote.findOne({});
    if (!voteResults) {
      const initialVotes = new Vote({
        prijezd: { obrad: 0, party: 0, celyDen: 0, neprijdu: 0 },
        spani: { ne: 0, autoStan: 0, zaplatim: 0 },
        jidlo: { vegetarian: 0 },
      });
      await initialVotes.save();
      return res.status(200).json(initialVotes);
    }
    res.status(200).json(voteResults);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get votes' });
  }
});

// API endpoint pro aktualizaci hlasů
app.post('/votes', async (req, res) => {
  const { category, option } = req.body;

  try {
    const voteResults = await Vote.findOne({});
    if (voteResults) {
      voteResults[category][option]++;
      await voteResults.save();
      return res.status(200).json(voteResults);
    }
    res.status(404).json({ error: 'Vote not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update votes' });
  }
});

// Spuštění serveru
const port = 5001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
