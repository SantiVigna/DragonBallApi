const requestURL = "https://dragonball-api.com/api/planets?limit=58"

async function fetchPlanetsJson(){
    try{
      const response = await fetch(requestURL);
      if (!response.ok) {
          throw new Error(`Error en la peticion ${response.status}`);
      }
      return await response.json();
  }
  catch (error){
      console.error(`Error al obtener los planetas de la API : `,error);
      return null;
  }
}

function createPlanetCard ({id, name, description, image}){
  return `<div class="card" style="width: 18rem;">
          <img src="${image}" class="card-img-top" alt="...">
          <div class="card-body">
              <h4 class="card-title">${name}</h4>
              <p class="card-text">${description}</p>
          </div>
      </div>
  `;
}

async function displayPlanets() {
  const planetSection = document.getElementById('planetsection');
  const planetData = await fetchPlanetsJson();

  if (planetData && planetData.items){
      const planetCards = planetData.items.map(createPlanetCard).join('');
      planetSection.innerHTML = planetCards;
  }
  else{
    planetSection.innerHTML = `<p>No se ha podido cargar el Json de los planetas</p>`
  }
}
displayPlanets();