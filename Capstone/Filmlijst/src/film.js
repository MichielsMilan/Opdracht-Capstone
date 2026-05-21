export class Film {
  constructor(id, titel, jaar) {
    this.id = id;
    this.titel = titel;
    this.jaar = jaar;
  }

  toHTML(id) {
    return `
      <li>
        ${this.titel} (${this.jaar})
        <button class="aanbeveel-btn" data-id="${id}">Aanbevelen</button>
        <div id="reden-${id}" style="display:none">
          <input id="reden-input-${id}" type="text" placeholder="Waarom aanbevelen?" />
          <button class="reden-bevestig" data-id="${id}">Bevestigen</button>
        </div>
      </li>
    `;
  }
}

export class AanbevolenFilm extends Film {
  constructor(id, titel, jaar, reden) {
    super(id, titel, jaar);
    this.reden = reden;
  }

  toHTML() {
    return `<li>${this.titel} (${this.jaar}) — ${this.reden}</li>`;
  }
}