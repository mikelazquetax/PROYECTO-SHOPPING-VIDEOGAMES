let allVideogames = [];
let contador = 0;
var date = new Date();
window.onload = () => {
 
  let bodyDoc = document.querySelector("body");
  let botonera = document.getElementById("botonera");
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
  if (contador > 0) {
    modal.remove();
  }

  modal = document.createElement("div");

  modal.classList.add("modal");

  bodyDoc.appendChild(modal);

  botonera = document.getElementById("botonera");
  botonera.classList.add("active");

  allVideogames.forEach((videogame) => {
    console.log(videogame.name);
    let juego = document.createElement("p");
    juego.innerText = videogame.name;
    modal.appendChild(juego);

    juego.addEventListener("click", () => {
      selectedGame = event.currentTarget.outerText;
      modal.remove();
      botonera.classList.remove("active");

      printGame(selectedGame);
    });
  });
};

printGame = (selectedGame) => {
  cuerpo = document.getElementById("cuerpo");

  if (contador > 0) {
    h2SelectedGame.remove();
    h3Genres.remove();
    realeaseDate.remove();
    globalRating.remove();
    buttonShowMoreRating.remove();
  }
  h2SelectedGame = document.createElement("h2");
  h2SelectedGame.innerText = selectedGame;
  h2SelectedGame.id = "selected";
  cuerpo.appendChild(h2SelectedGame);
  contador = contador + 1;

  h3Genres = document.createElement("h3");
  h3Genres.innerText = "Género: ";

  const selectedVideogameArray = allVideogames.filter(function (item) {
    return item.name == h2SelectedGame.innerText;
  });

  h3Genres.innerText =
    "Género Principal: " + selectedVideogameArray[0].genres[0].name;
  cuerpo.appendChild(h3Genres);

  try {
    thirdImg = document.getElementById("Img4");
    thirdImg.src = selectedVideogameArray[0].short_screenshots[3].image;
  } catch {
    thirdImg = document.getElementById("Img4");
    thirdImg.src = selectedVideogameArray[0].short_screenshots[0].image;
  }

  firstImg = document.getElementById("Img2");
  firstImg.src = selectedVideogameArray[0].short_screenshots[1].image;

  secImg = document.getElementById("Img3");
  secImg.src = selectedVideogameArray[0].short_screenshots[2].image;

  coverGame = document.getElementById("Imgc");
  coverGame.src = selectedVideogameArray[0].background_image;

  realeaseDate = document.createElement("h5");
  var date = selectedVideogameArray[0].released;
  var dateArray = date.split("-");

  realeaseDate.innerText =
    "Release Date: " + dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];

  ratingsBody = document.getElementById("ratings");
  ratingsBody.appendChild(realeaseDate);

  globalRating = document.createElement("h5");
  globalRating.innerText = "Global Rating: " + selectedVideogameArray[0].rating;

  ratingsBody.appendChild(globalRating);

  buttonShowMoreRating = document.createElement("button");
  buttonShowMoreRating.innerText = "Show More";
  ratingsBody.appendChild(buttonShowMoreRating);

  buttonShowMoreRating.addEventListener("click", (selectedVideogameArray) => {
    botonera.classList.add("active");

    modalWithRatings(selectedVideogameArray);
    
  });

  priceUnit = document.getElementById("priceEur");
  priceUnit.innerText =
    Math.round(selectedVideogameArray[0].rating * 10) + " " + "Euros";

  let botonMore = document.getElementById("more");
  let botonLess = document.getElementById("less");

  botonMore.addEventListener("click", () => {
    unitsSold = document.getElementById("nUnits");
    fPrice = document.getElementById("fPrice");
    unitsSoldNumber = parseFloat(unitsSold.innerText);
    let unidades = addUnits(unitsSoldNumber);
    unitsSold.innerText = unidades;
    fPrice.innerText =
      unidades * Math.round(selectedVideogameArray[0].rating * 10);
  });

  botonLess.addEventListener("click", () => {
    unitsSold = document.getElementById("nUnits");
    fPrice = document.getElementById("fPrice");
    unitsSoldNumber = parseFloat(unitsSold.innerText);
    let unidades = subUnits(unitsSoldNumber);
    unitsSold.innerText = unidades;
    fPrice.innerText =
      unidades * Math.round(selectedVideogameArray[0].rating * 10);
  });
};

addUnits = (unitsSoldNumber) => {
  return (unitsSoldNumber = unitsSoldNumber + 1);
};

subUnits = (unitsSoldNumber) => {
  if (unitsSoldNumber > 0) {
    unitsSoldNumber = unitsSoldNumber - 1;
  } else {
    unitsSoldNumber = 0;
  }
  return unitsSoldNumber;
};

modalWithRatings = () => {
  var selectedTitle = document.getElementById("selected").innerText;
  const videogameForRating = allVideogames.filter((item) => {
    return item.name == selectedTitle;
  });
  console.log(videogameForRating);
  fechaRelease = videogameForRating[0].released
  ratings = [];
  ratings = [...videogameForRating[0].ratings];
/*   class calculoFecha{
    constructor(){}
      static calcularDiasRelease(fechaRelease){

        function formatDate(date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();
      
          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;
      
          return [year, month, day].join('-');
      }
     let fechaF = formatDate(date)
        const today = new Date();
        let rel = fechaF.getTime() - fechaRelease.getTime()
        return rel
      }

    
  }
  
  let rel = calculoFecha.calcularDiasRelease(fechaRelease) */
  class VideogameRating {
    #isMustBuy;
    #numberOfReviews;
    constructor() {
      
      this.name = videogameForRating[0].name;
      this.exceptional = ratings[0].percent;
      this.recommended = ratings[1].percent;
      this.meh = ratings[2].percent;
      this.skip = ratings[3].percent;
      this.#isMustBuy = 'Yes/No';
      this.#numberOfReviews = 0;
    }
    getFullEvaluation = () => {
      var pModal = document.createElement('p')
      pModal.innerText =  this.name + " tiene un " + this.skip +  " % de malas reviews, un " +
          this.meh + " % de reviews suficientes, un " + this.recommended + " % de review que lo recomiendan" +
          " y un " + this.exceptional + " % de reviews excelentes"
   
      var modalForRatings = document.createElement('div')
        

     var headerModal = document.createElement('div')
     headerModal.id ='headerModal'
      headerModal.classList.add('modal-header')
      modalForRatings.appendChild(headerModal)
   
    var  titleModal = document.createElement("h3");
    titleModal.id ='header'
      titleModal.classList.add("title");
      titleModal.innerText = this.name
      headerModal.appendChild(titleModal)

      var buttonClose = document.createElement('button')
      buttonClose.classList.add('closeB')
      buttonClose.innerText = 'X'
      headerModal.appendChild(buttonClose)

      buttonClose.addEventListener('click',()=>{
        modalForRatings.remove()
        botonera.classList.remove("active");

      })

      var modalSkip = document.createElement('div')
      modalSkip.innerText = 'Excellent'
      modalSkip.classList.add('pie')
      modalSkip.style.setProperty('--percentage', `${this.exceptional}`) 
      modalSkip.style.setProperty('--fill', '#33FFFF' )
      var modalMeh = document.createElement('div')
      modalMeh.classList.add('pie')
      modalMeh.style.setProperty('--percentage', `${this.recommended}`) 
      modalMeh.style.setProperty('--fill', '#33FF5B' )
      modalMeh.innerText = 'Good'
      var modalRecommended = document.createElement('div')
      modalRecommended.classList.add('pie')
      modalRecommended.style.setProperty('--percentage', `${this.meh}`) 
      modalRecommended.style.setProperty('--fill', '#F3FF33' )
      modalRecommended.innerText = 'Not Bad'
      var modalExcepcional = document.createElement('div')
      modalExcepcional.classList.add('pie')
      modalExcepcional.style.setProperty('--percentage', `${this.skip}`) 
      modalExcepcional.style.setProperty('--fill', '#FF3633' )
      modalExcepcional.innerText = 'Skip'
      modalForRatings.appendChild(modalSkip)
       modalForRatings.appendChild(modalMeh)
      modalForRatings.appendChild(modalRecommended)
      modalForRatings.appendChild(modalExcepcional)
      modalForRatings.appendChild(pModal)
      

      
      modalForRatings.classList.add('modalRating')
      modalForRatings.id = 'mRatings'
      let bodyDoc = document.querySelector("body");
      bodyDoc.appendChild(modalForRatings)
      
    };

    get isMustBuyValue(){
  return  this.exceptional 

    }

    set isMustBuyValue(exceptionalValuation){
      var isAMust = document.createElement('p')
      
      var modalForRatings = document.getElementById('mRatings')
      modalForRatings.appendChild(isAMust)
      if(exceptionalValuation > 50){
        this.#isMustBuy = 'Is it a Must Buy? : Yes'
        isAMust.innerText =  this.#isMustBuy
      }else{
        this.#isMustBuy = 'Is it a Must Buy? : No'
        isAMust.innerText = this.#isMustBuy 
      }
    }

    get numberOfReviews(){
      let totalReviews = ratings.reduce((ini,review)=>{
        return ini + review.count
      },0)
      return totalReviews
    }

    set numberOfReviews(totalRevs){
      this.#numberOfReviews = totalRevs
      var pTotalRevs = document.createElement('p')
      pTotalRevs.innerText = `${this.#numberOfReviews}  Reviews `
      var headerModal = document.getElementById('header')
      header.appendChild(pTotalRevs)
    }
  }
 
  const videoRating = new VideogameRating(
   
    ratings[0].percent,
    ratings[1].percent,
    ratings[2].percent,
    ratings[3].percent

  );

 videoRating.getFullEvaluation();
  console.log(videoRating.isMustBuyValue)
  console.log(videoRating.numberOfReviews)

  var totalRevs = videoRating.numberOfReviews
  videoRating.numberOfReviews = totalRevs
  var exceptionalValuation = videoRating.isMustBuyValue
  videoRating.isMustBuyValue = exceptionalValuation

};
