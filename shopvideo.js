let allVideogames = [];
let contador = 0;

window.onload = () => {
  let bodyDoc = document.querySelector("body");
  let botonera = document.getElementById('botonera')
  let botonBusqueda = document.createElement("button");



  botonBusqueda.innerText = "Buscar Videojuegos";
  botonera.appendChild(botonBusqueda);

  botonBusqueda.addEventListener("click", () => {
    let select = document.getElementById("selectorYear");
    let relYearText = select.options[select.selectedIndex].text;
    relYear = parseFloat(relYearText);

    let selectPlat = document.getElementById("selectorPlatform");
    let platf = selectPlat.options[selectPlat.selectedIndex].value;

    datosVideojuego(bodyDoc, relYear, platf);
  });
};

const datosVideojuego = async (bodyDoc, relYear, platf, classCarousel) => {
  try {
    //Pasamos el token y filtramos por la plataforma 7 que es la Nintendo Switch y por el año actual 2021
    let respuesta = await fetch(
      `https://api.rawg.io/api/games?key=1bd1aed8db0d49a3929d9cb0bb02d65d&dates=${relYear}-01-01,${relYear}-12-31&platforms=${platf}`
    );
    let dato = await respuesta.json();
    allVideogames = [...dato.results];
    console.log(allVideogames);
  
    searchHelp(bodyDoc);
  
  } catch {
    console.log("error");
  }
};

searchHelp = (bodyDoc) => {

  if (contador > 0){
    modal.remove()
  }

  modal = document.createElement("div");

  modal.classList.add("modal");

  bodyDoc.appendChild(modal);

  botonera = document.getElementById('botonera')
  botonera.classList.add('active')

  allVideogames.forEach((videogame) => {
    console.log(videogame.name);
    let juego = document.createElement("p");
    juego.innerText = videogame.name;
    modal.appendChild(juego);

    juego.addEventListener("click", () => {
      selectedGame = event.currentTarget.outerText;
      modal.remove();
      botonera.classList.remove('active')



      printGame(selectedGame);
 
    });
  });
};

printGame = (selectedGame) => {

  cuerpo = document.getElementById('cuerpo')

  if (contador > 0) {
   h2SelectedGame.remove()
   h3Genres.remove()
   realeaseDate.remove()
   globalRating.remove()
  
  }
  h2SelectedGame = document.createElement("h2");
  h2SelectedGame.innerText = selectedGame;
  cuerpo.appendChild(h2SelectedGame);
  contador = contador + 1

  h3Genres = document.createElement('h3')
  h3Genres.innerText = 'Género: '
  
  const selectedVideogameArray = allVideogames.filter(function(item){
    return item.name == h2SelectedGame.innerText
  })


    h3Genres.innerText = 'Género Principal: ' + selectedVideogameArray[0].genres[0].name
    cuerpo.appendChild(h3Genres)

    try{

    thirdImg = document.getElementById('Img4')
    thirdImg.src = selectedVideogameArray[0].short_screenshots[3].image
  }catch{
    thirdImg = document.getElementById('Img4')
    thirdImg.src = selectedVideogameArray[0].short_screenshots[0].image

  }

    firstImg = document.getElementById('Img2')
    firstImg.src = selectedVideogameArray[0].short_screenshots[1].image

    secImg = document.getElementById('Img3')
    secImg.src = selectedVideogameArray[0].short_screenshots[2].image

    coverGame = document.getElementById('Imgc')
    coverGame.src = selectedVideogameArray[0].background_image

    realeaseDate = document.createElement('h5')
    var date = selectedVideogameArray[0].released
    var dateArray = date.split('-')

    realeaseDate.innerText = 'Release Date: ' + dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0]

    ratingsBody = document.getElementById('ratings')
    ratingsBody.appendChild(realeaseDate)

    globalRating =  document.createElement('h5')
    globalRating.innerText = 'Global Rating: ' + selectedVideogameArray[0].rating

    ratingsBody.appendChild(globalRating)

 

    priceUnit = document.getElementById('priceEur')
    priceUnit.innerText = Math.round(selectedVideogameArray[0].rating * 10) + ' ' + 'Euros'
    
    let botonMore = document.getElementById('more')
    let botonLess = document.getElementById('less')

botonMore.addEventListener('click', ()=>{
  unitsSold = document.getElementById('nUnits')
  fPrice = document.getElementById('fPrice')
  unitsSoldNumber = parseFloat(unitsSold.innerText)
  let unidades = addUnits(unitsSoldNumber)
  unitsSold.innerText = unidades
  fPrice.innerText = unidades *  Math.round(selectedVideogameArray[0].rating * 10)
})

botonLess.addEventListener('click', () =>{
  unitsSold = document.getElementById('nUnits')
  fPrice = document.getElementById('fPrice')
  unitsSoldNumber = parseFloat(unitsSold.innerText)
  let unidades = subUnits(unitsSoldNumber)
  unitsSold.innerText = unidades
  fPrice.innerText = unidades *  Math.round(selectedVideogameArray[0].rating * 10)
})



};




addUnits = (unitsSoldNumber) => {
  return unitsSoldNumber = unitsSoldNumber + 1

}

subUnits = (unitsSoldNumber) => {
  if (unitsSoldNumber > 0){
  unitsSoldNumber = unitsSoldNumber - 1
}else{
  unitsSoldNumber = 0
}
return  unitsSoldNumber
}