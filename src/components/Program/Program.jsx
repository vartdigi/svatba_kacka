import './Program.css';
import { useState, useEffect } from 'react';

export const Program = () => {
  const [votes, setVotes] = useState(null);
  const [loading, setLoading] = useState(true);

  // Funkce pro hlasování
  const handleVote = (category, option) => {
    fetch('http://localhost:5001/votes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category, option }),
    })
      .then((response) => response.json())
      .then((updatedVotes) => {
        setVotes(updatedVotes); // Aktualizace stavu s novými hodnotami hlasů
      })
      .catch((error) => {
        console.error('Error updating vote:', error);
      });
  };

  // Načítání hlasů z backendu
  useEffect(() => {
    fetch('https://holeckovi.netlify.app/.netlify/functions/my-api')
      .then((response) => response.json())
      .then((data) => {
        setVotes(data);
        setLoading(false); // Nastavíme loading na false po načtení dat
      })
      .catch((error) => {
        console.error('Error fetching votes:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Načítám data...</div>;
  }

  if (!votes) {
    return <div>Nepodařilo se načíst hlasování.</div>;
  }

  return (
    <section id="Tabulka">
      <div className="form">
        <h1>Vyberte, jak byste chtěli reagovat na jednotlivé možnosti:</h1>

        {/* Příjezd */}
        <div className="field">
          <label>Příjezd:</label>
          <div className="options">
            <div className="option">
              <button onClick={() => handleVote('prijezd', 'obrad')}>
                {votes.prijezd
                  ? `Přijedu jen na obřad (${votes.prijezd.obrad})`
                  : 'Načítání...'}
              </button>
            </div>
            <div className="option">
              <button onClick={() => handleVote('prijezd', 'party')}>
                {votes.prijezd
                  ? `Přijedu až na párty od 16:00 (${votes.prijezd.party})`
                  : 'Načítání...'}
              </button>
            </div>
            <div className="option">
              <button onClick={() => handleVote('prijezd', 'celyDen')}>
                {votes.prijezd
                  ? `Přijedu na celý den (${votes.prijezd.celyDen})`
                  : 'Načítání...'}
              </button>
            </div>
            <div className="option">
              <button onClick={() => handleVote('prijezd', 'neprijdu')}>
                {votes.prijezd
                  ? `Nepřijdu (${votes.prijezd.neprijdu})`
                  : 'Načítání...'}
              </button>
            </div>
          </div>
        </div>

        {/* Spaní */}
        <div className="field">
          <label>Spaní:</label>
          <div className="options">
            <div className="option">
              <button onClick={() => handleVote('spani', 'ne')}>
                {votes.spani
                  ? `Nebudu spát (${votes.spani.ne})`
                  : 'Načítání...'}
              </button>
            </div>
            <div className="option">
              <button onClick={() => handleVote('spani', 'autoStan')}>
                {votes.spani
                  ? `Budu spát zadarmo v autě/stanu (${votes.spani.autoStan})`
                  : 'Načítání...'}
              </button>
            </div>
            <div className="option">
              <button onClick={() => handleVote('spani', 'zaplatim')}>
                {votes.spani
                  ? `Zaplatím si ubytování na místě (${votes.spani.zaplatim})`
                  : 'Načítání...'}
              </button>
            </div>
          </div>
        </div>

        {/* Jídlo */}
        <div className="field">
          <label>Jídlo:</label>
          <div className="options">
            <div className="option">
              <button onClick={() => handleVote('jidlo', 'vegetarian')}>
                {votes.jidlo
                  ? `Jsem vegetarián (${votes.jidlo.vegetarian})`
                  : 'Načítání...'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Program;
