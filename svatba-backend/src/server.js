require('dotenv').config(); // Načte proměnné z .env souboru

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'https://holeckovi.netlify.app'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

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

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
