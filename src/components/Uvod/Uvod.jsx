import React from 'react';
import UvodniFotka from '../../../assets/UvodniFotka.png';
import './Uvod.css';
import Sipka from '../../../assets/sipka1.png';
import uvodniJmeno from '../../../assets/uvodniJmeno.png';
import uvodniPrijmeni from '../../../assets/uvodniPrijmeni.png';

import termin from '../../../assets/termin.png';

export const Uvod = () => {
  return (
    <section id="Uvod">
      <div className="opening">
        <div className="naseFotka">
          <img className="fotka" src={UvodniFotka} />
        </div>
      </div>

      <div className="uvodniJmeno">
        <img src={uvodniJmeno} />
      </div>
      <div>
        <div className="uvodniPrijmeni">
          <img src={uvodniPrijmeni} />
        </div>
      </div>
      <div className="termin">
        <img src={termin} />
      </div>

      <div className="sipka">
        <img src={Sipka} />
      </div>
    </section>
  );
};
