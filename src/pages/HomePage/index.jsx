import './style.css';
import { Uvod } from '../../components/Uvod/Uvod.jsx';
import { MistoKonani } from '../../components/MistoKonani/MistoKonani.jsx';
import { Ubytovani } from '../../components/Ubytovani/Ubytovani.jsx';
import { Program } from '../../components/Program/Program.jsx';

export const HomePage = () => {
  return (
    <div className="container">
      <Uvod />
      <MistoKonani />
      <Ubytovani />
      <Program />
    </div>
  );
};
