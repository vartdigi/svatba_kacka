require('dotenv').config({ path: './src/.env' }); // Načte proměnné z .env souboru

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Kontrola, zda existuje MONGO_URI v .env souboru
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('MONGO_URI není definováno v .env souboru!');
  process.exit(1); // Zastaví server, pokud není URI
}

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
    process.exit(1); // Zastaví server při chybě při připojení k MongoDB
  });

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
    obrad: { type: Number, default: 0 },
    party: { type: Number, default: 0 },
    celyDen: { type: Number, default: 0 },
    neprijdu: { type: Number, default: 0 },
  },
  spani: {
    ne: { type: Number, default: 0 },
    autoStan: { type: Number, default: 0 },
    zaplatim: { type: Number, default: 0 },
  },
  jidlo: {
    vegetarian: { type: Number, default: 0 },
  },
});

const Vote = mongoose.model('Vote', voteSchema);

// Endpoint pro získání hlasů
app.get('/votes', async (req, res) => {
  try {
    let voteResults = await Vote.findOne({});

    if (!voteResults) {
      // Vytvoření výchozích hodnot pro hlasování, pokud žádné neexistují
      voteResults = new Vote();
      await voteResults.save();
    }

    res.status(200).json(voteResults);
  } catch (err) {
    console.error('Error fetching votes:', err);
    res.status(500).json({ error: 'Failed to get votes' });
  }
});

// Endpoint pro přidání hlasu
app.post('/votes', async (req, res) => {
  const { category, option } = req.body;

  try {
    const voteResults = await Vote.findOne({});
    if (voteResults && voteResults[category]) {
      if (voteResults[category][option] !== undefined) {
        voteResults[category][option]++;
        await voteResults.save();
        return res.status(200).json(voteResults);
      } else {
        return res.status(400).json({ error: 'Invalid vote option' });
      }
    }
    res.status(404).json({ error: 'Vote category not found' });
  } catch (err) {
    console.error('Error updating votes:', err);
    res.status(500).json({ error: 'Failed to update votes' });
  }
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
