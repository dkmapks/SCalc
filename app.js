let budzet = parseFloat(localStorage.getItem('budzet')) || 0;
let dlugi = JSON.parse(localStorage.getItem('dlugi')) || [];
let stanSkuna = parseFloat(localStorage.getItem('stanSkuna')) || 0;

function zapiszDane() {
  localStorage.setItem('budzet', budzet);
  localStorage.setItem('dlugi', JSON.stringify(dlugi));
  localStorage.setItem('stanSkuna', stanSkuna);
  wyswietlDane();
}

function wyswietlDane() {
  document.getElementById('budzet-display').textContent = budzet.toFixed(2);
  document.getElementById('stan-display').textContent = stanSkuna.toFixed(2);

  const dlugiLista = document.getElementById('dlugi-lista');
  dlugiLista.innerHTML = '';

  dlugi.forEach((dlug, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p><strong>${dlug.imie}</strong>: Dług ${dlug.kwota.toFixed(2)} zł za ${dlug.ilosc}g (${dlug.cenaZaGram.toFixed(2)} zł/g)</p>
      <p>Data spłaty: ${dlug.dataSplaty}</p>
      <button onclick="usunDlug(${index})">Usuń dług (odbierz kasę)</button>
    `;
    dlugiLista.appendChild(div);
  });
}

function dodajBudzet() {
  const kwota = parseFloat(document.getElementById('budzet-input').value);
  if (!isNaN(kwota) && kwota > 0) {
    budzet += kwota;
    zapiszDane();
    document.getElementById('budzet-input').value = '';
  }
}

function kupSort() {
  const cenaGram = parseFloat(document.getElementById('sort-cena-gram').value);
  const iloscGram = parseFloat(document.getElementById('sort-ilosc-gram').value);
  if (!isNaN(cenaGram) && !isNaN(iloscGram) && cenaGram > 0 && iloscGram > 0) {
    const koszt = cenaGram * iloscGram;
    if (budzet >= koszt) {
      budzet -= koszt;
      stanSkuna += iloscGram;
      zapiszDane();
      document.getElementById('sort-cena-gram').value = '';
      document.getElementById('sort-ilosc-gram').value = '';
    } else {
      alert('Za mały budżet!');
    }
  }
}

function rzucSkun() {
  const imie = document.getElementById('rzuc-imie').value.trim();
  const iloscGram = parseFloat(document.getElementById('rzuc-ilosc-gram').value);
  const cenaGram = parseFloat(document.getElementById('rzuc-cena-gram').value);
  const dataSplaty = document.getElementById('rzuc-data-splaty').value;

  if (!imie) {
    alert('Podaj imię!');
    return;
  }

  if (!isNaN(iloscGram) && !isNaN(cenaGram) && iloscGram > 0 && cenaGram > 0 && dataSplaty) {
    if (stanSkuna >= iloscGram) {
      stanSkuna -= iloscGram;
      const kwota = cenaGram * iloscGram;
      dlugi.push({ imie: imie, cenaZaGram: cenaGram, ilosc: iloscGram, kwota: kwota, dataSplaty: dataSplaty });
      zapiszDane();
      document.getElementById('rzuc-imie').value = '';
      document.getElementById('rzuc-ilosc-gram').value = '';
      document.getElementById('rzuc-cena-gram').value = '';
      document.getElementById('rzuc-data-splaty').value = '';
    } else {
      alert('Za mało skuna na stanie!');
    }
  }
}

function usunDlug(index) {
  const dlug = dlugi[index];
  budzet += dlug.kwota; // dodajemy kasę do budżetu
  dlugi.splice(index, 1); // usuwamy dług
  zapiszDane();
}

wyswietlDane();
