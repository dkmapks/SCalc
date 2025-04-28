let budzet = parseFloat(localStorage.getItem('budzet')) || 0;
let dlugi = JSON.parse(localStorage.getItem('dlugi')) || [];

function zapiszDane() {
  localStorage.setItem('budzet', budzet);
  localStorage.setItem('dlugi', JSON.stringify(dlugi));
  wyswietlDane();
}

function wyswietlDane() {
  document.getElementById('budzet-display').textContent = budzet.toFixed(2);

  const dlugiLista = document.getElementById('dlugi-lista');
  dlugiLista.innerHTML = '';

  dlugi.forEach((dlug, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p>Dług: ${dlug.kwota.toFixed(2)} zł za ${dlug.ilosc}g (${dlug.cenaZaGram.toFixed(2)} zł/g)</p>
      <p>Data spłaty: ${dlug.dataSplaty}</p>
      <button onclick="usunDlug(${index})">Usuń dług</button>
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
      zapiszDane();
      document.getElementById('sort-cena-gram').value = '';
      document.getElementById('sort-ilosc-gram').value = '';
    } else {
      alert('Za mały budżet!');
    }
  }
}

function dodajDlug() {
  const cenaGram = parseFloat(document.getElementById('dlug-cena-gram').value);
  const iloscGram = parseFloat(document.getElementById('dlug-ilosc-gram').value);
  const dataSplaty = document.getElementById('dlug-data-splaty').value;

  if (!isNaN(cenaGram) && !isNaN(iloscGram) && cenaGram > 0 && iloscGram > 0 && dataSplaty) {
    const kwota = cenaGram * iloscGram;
    dlugi.push({ cenaZaGram: cenaGram, ilosc: iloscGram, kwota: kwota, dataSplaty: dataSplaty });
    zapiszDane();
    document.getElementById('dlug-cena-gram').value = '';
    document.getElementById('dlug-ilosc-gram').value = '';
    document.getElementById('dlug-data-splaty').value = '';
  }
}

function usunDlug(index) {
  dlugi.splice(index, 1);
  zapiszDane();
}

wyswietlDane();
