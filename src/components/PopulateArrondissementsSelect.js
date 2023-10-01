


export function PopulateArrondissements(lieuxTournageInstance) {

  let lieuxTournageLayer = lieuxTournageInstance;

  const selectElement = document.getElementById('arrondissement');
  let arrondissementSet = []; // Permet de stocker les arrondissements de manière unique

  lieuxTournageLayer.forEach((feature) => {
    const arrondissement = feature.getProperty("ardt_lieu");
    if (arrondissement && arrondissement.trim() !== "") {
      arrondissementSet.push(arrondissement);
    }
  });

  const liElements = selectElement.querySelectorAll('li');

  liElements.forEach(li => {

    const aElement = li.querySelector('a');

    const dataValue = parseInt(aElement.getAttribute('data-value'));

    if (arrondissementSet.includes(dataValue)) {

      arrondissementSet = arrondissementSet.filter(value => value !== dataValue);

    }
  })

  arrondissementSet = Array.from(new Set(arrondissementSet));

  arrondissementSet = arrondissementSet.filter((value, index, self) => self.indexOf(value) === index);

  // Parcourir le Set et créer les options
  arrondissementSet.forEach((arrondissement) => {
    const newListItem = document.createElement("li");
    const newLink = document.createElement('a');
    newLink.setAttribute('href', '#');
    newLink.setAttribute('data-value', arrondissement)
    newLink.classList.add('dropdown-item');
    newLink.textContent = arrondissement;

    newListItem.appendChild(newLink);
    selectElement.appendChild(newListItem);
  });
}