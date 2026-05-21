import './style.css'
import { getFilms, postFilm } from './api.js';
import { Film, AanbevolenFilm } from './film.js';

document.querySelector('#app').innerHTML = `
  <h1>Filmlijst</h1>
  <ul id="film-lijst"></ul>
  <h3>Film toevoegen</h3>
  <input id="titel" type="text" placeholder="Titel" />
  <input id="jaar" type="number" placeholder="Jaar" />
  <button id="voeg-toe">Toevoegen</button>
`;

function laadFilms() {
  getFilms().then(data => {
    const lijst = document.querySelector('#film-lijst');
    lijst.innerHTML = data
      .map(f => {
        if (f.reden) {
          return new AanbevolenFilm(f.id, f.titel, f.jaar, f.reden).toHTML(f.id);
        }
        return new Film(f.id, f.titel, f.jaar).toHTML(f.id);
      })
      .join('');


    lijst.querySelectorAll('.aanbeveel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const redenDiv = document.querySelector(`#reden-${id}`);
        if (redenDiv.style.display === 'none') {
          redenDiv.style.display = 'block'; 
        } else {
          redenDiv.style.display = 'none'; 
        }
      });
    });

    lijst.querySelectorAll('.reden-bevestig').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const reden = document.querySelector(`#reden-input-${id}`).value;
        aanbeveelFilm(id, reden);
      });
    });
  });
}

function aanbeveelFilm(id, reden) {
  fetch(`http://localhost:3000/api/films/${id}/aanbeveel`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reden }),
  }).then(() => laadFilms());
}

laadFilms();

document.querySelector('#voeg-toe').addEventListener('click', () => {
  const titel = document.querySelector('#titel').value;
  const jaar = document.querySelector('#jaar').value;

  postFilm(titel, jaar).then(() => {
    laadFilms();
    document.querySelector('#titel').value = '';
    document.querySelector('#jaar').value = '';
  });
});