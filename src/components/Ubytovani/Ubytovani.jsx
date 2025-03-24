import Ubytko from '../../../assets/Ubytko.png';
import './Ubytovani.css';

export const Ubytovani = () => {
  const handleClick = () => {
    window.open('https://sd-biskoupky.cz/');
  };
  return (
    <section id="Ubytovani">
      <div className="detailUbytovani">
        <p className="textUbytovani">
          Nemáme žádné doporučené barvy, jen na obřad berte něco formálnějšího a
          na odpoledne si s sebou určitě zabalte něco pohodlného, v čem neumřete
          vedrem. Pro ženicha jsou sako s košilí něco jako montérky, takže v tom
          taky vydrží jen tu nejnutnější dobu a pak oblek vymění za něco
          normálního.
        </p>
        <div className="druhyOdstavec">
          <p>
            Budeme moc rádi, když s námi náš den prožijete a žádný dary
            neočekáváme! A kdybyste nám přecijen chtěli něco dát, tak budeme
            rádi za každou kačku (ne tu v bílém, ta stačí jedna). Všechno
            ostatní už totiž máme.
          </p>
        </div>
      </div>
    </section>
  );
};
