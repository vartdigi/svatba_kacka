import React, { useState } from 'react';
import './Program.css';

export const Program = () => {
  // Počty hlasů pro každou možnost
  const [votes, setVotes] = useState({
    prijezd: { obrad: 0, party: 0, celyDen: 0, neprijdu: 0 },
    spani: { ne: 0, autoStan: 0, zaplatim: 0 },
    jidlo: { vegetarian: 0 },
  });

  // Funkce pro zvýšení počtu hlasu pro vybranou možnost
  const handleVote = (category, option) => {
    setVotes((prevVotes) => {
      const newVotes = { ...prevVotes };
      newVotes[category][option]++;
      return newVotes;
    });
  };

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
                Přijedu jen na obřad ({votes.prijezd.obrad})
              </button>
            </div>
            <div className="option">
              <button onClick={() => handleVote('prijezd', 'party')}>
                Přijedu až na párty od 16:00 ({votes.prijezd.party})
              </button>
            </div>
            <div className="option">
              <button onClick={() => handleVote('prijezd', 'celyDen')}>
                Přijedu na celý den ({votes.prijezd.celyDen})
              </button>
            </div>
            <div className="option">
              <button onClick={() => handleVote('prijezd', 'neprijdu')}>
                Nepřijedu ({votes.prijezd.neprijdu})
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
                Nebudu spát ({votes.spani.ne})
              </button>
            </div>
            <div className="option">
              <button onClick={() => handleVote('spani', 'autoStan')}>
                Budu spát zadarmo v autě/stanu ({votes.spani.autoStan})
              </button>
            </div>
            <div className="option">
              <button onClick={() => handleVote('spani', 'zaplatim')}>
                Zaplatím si ubytování na místě ({votes.spani.zaplatim})
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
                Jsem vegetarián ({votes.jidlo.vegetarian})
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
