const requestURL = "https://dragonball-api.com/api/characters?page=1&limit=58"

async function fetchCharacterJson(){
    try{
      const response = await fetch(requestURL);
      if (!response.ok) {
          throw new Error(`Error en la peticion ${response.status}`);
      }
      return await response.json();
  }
  catch (error){
      console.error(`Error al obtener los personajes de la API : `,error);
      return null;
  }
}

function createCharacterCard ({name, ki, maxKi, race, gender, image, affiliation}){
  return `<div class="cardCharacters card" >
            <img class="card-img-top" src="${image}" alt="Card image cap">
              <div class="card-body">
                  <h5 class="card-title">${name}</h5>
                  <p class="card-text">${race} - ${gender}</p>
              </div>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">Ki: ${ki}</li>
                  <li class="list-group-item">Maximum Ki: ${maxKi}</li>
                  <li class="list-group-item">Affiliation: ${affiliation}</li>
              </ul>
        </div>
  `;
}

async function displayCharacters() {
  const characterSection = document.getElementById('charactersection');
  const charactersData = await fetchCharacterJson();

  if (charactersData && charactersData.items){
      const characterCards = charactersData.items.map(createCharacterCard).join('');
      characterSection.innerHTML = characterCards;
  }
  else{
    characterSection.innerHTML = `<p>No se ha podido cargar el Json de los personajes</p>`
  }
}
displayCharacters();