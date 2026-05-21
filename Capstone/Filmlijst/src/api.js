const BASE_URL = 'http://localhost:3000/api';

export function getFilms() {
  return fetch(`${BASE_URL}/films`)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('films', JSON.stringify(data));
      return data;
    })
    .catch(() => {
      const lokaal = localStorage.getItem('films');
      if (lokaal) {
        return JSON.parse(lokaal);
      } else {
        return [];
      }
    });
}

export function postFilm(titel, jaar) {
  return fetch(`${BASE_URL}/films`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titel, jaar }),
  }).then(res => res.json());
}