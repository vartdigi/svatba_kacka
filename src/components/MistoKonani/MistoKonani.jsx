import './MistoKonani.css';

import React from 'react';

export const MistoKonani = () => {
  const handleClick = () => {
    window.open('https://maps.app.goo.gl/ZVZcGMmJzttgw6kN7');
  };
  return (
    <>
      <section id="Misto">
        <div className="Text">
          <span>Čaau!</span>
          <p>
            Jestliže máte tenhle odkaz, chceme Vás na naší svatbě, která se
            uskuteční 12.7.2025 ve 14h v Hotelu Selský dvůr v Biskoupkách (u
            Zbirohu).Parkování je zajištěné v areálu a je zdarma.
          </p>
        </div>

        <div className="mistoKonani">
          <button onClick={handleClick} className="btn">
            MAPA
          </button>
        </div>
      </section>
    </>
  );
};
