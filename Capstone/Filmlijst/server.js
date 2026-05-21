import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const films = [
  { id: 1, titel: 'Inception', jaar: 2010 },
  { id: 2, titel: 'Interstellar', jaar: 2014 },
  { id: 3, titel: 'The Dark Knight', jaar: 2008 },
];

app.get('/api/films', (req, res) => {
  res.json(films);
});

app.post('/api/films', (req, res) => {
  const nieuweFilm = {
    id: films.length + 1,
    titel: req.body.titel,
    jaar: req.body.jaar,
  };
  films.push(nieuweFilm);
  res.json(nieuweFilm);
});

app.post('/api/films/:id/aanbeveel', (req, res) => {
  const id = parseInt(req.params.id);
  const film = films.find(f => f.id === id);
  if (film) {
    film.reden = req.body.reden;
  }
  res.json(film);
});

app.listen(3000, () => {
  console.log('Server draait op http://localhost:3000');
});