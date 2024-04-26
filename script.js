function create(tag, className, id, text) {
  let ele = document.createElement(tag);
  ele.classList = className;
  ele.id = id;
  ele.innerHTML = text;
  return ele;
}

let container = create("div", "container", "", "");
let title = create("h1", "text-center", "title", "Weather");

let searchBox = create("div", "search-box", "", "");
let searchRow = create("div", "searchRow", "", "");
let searchInput = create("input", "searchInput", "input", "");
searchInput.setAttribute("placeholder", "Search countries");
let searchButton = create(
  "button",
  "searchButton",
  "",
  '<i class="fa fa-search" aria-hidden="true"></i>'
);

searchRow.append(searchInput, searchButton);
searchBox.append(searchRow);

let row = create("div", "row", "", "");
container.append(title);
container.append(searchBox);
container.append(row);
document.body.append(container);

function alertData(lat, lon, name) {
  let weather = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d1e16d86875df49d416e1a6a9c98b970`
  );
  weather
    .then((data1) => data1.json())
    .then((res) => {
     
      alert(`weather in ${name}  is ${res.main.temp}`);
    });
}

let countries = fetch("https://restcountries.com/v3.1/all");
countries
  .then((data) => data.json())
  .then((result) => {
    function createCard(data) {
      row.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
        let card = document.createElement("div");
        card.classList = " col-sm-12 col-md-6 col-lg-4 card-container";

        card.innerHTML = `
        <div class="card">
            <div class="cardHead">
                <div class="imgContainer">
                    <div class="imgMask"><img src="${data[i].flags.png}" alt="countryFlag"></div>
                </div>
                <div class="infoContainer">
                    <div class="cardTitle">
                        <h3 class="countryName">${data[i].name.common} <br><span>${data[i].cca3}</span></h3>
                    </div>
                    <div class="card-body">
                        <p>Capital:${data[i].capital}</p>
                        <p>Region:${data[i].region}</p>    
                    </div>
                </div>
            </div>
            <div class="buttonSection">
                <button class="btn btn-primary" onclick="alertData(${data[i].latlng}, '${data[i].name.common}')">Check weather</button>
            </div>
        </div>`;

        row.append(card);
      }
      
    }
    createCard(result);

    searchInput.onkeyup = function () {
      let rez = [];
      let searchName = searchInput.value;
      if (searchName.length) {
        rez = result.filter((keyword) => {
          return keyword.name.common
            .toLowerCase()
            .includes(searchName.toLowerCase());
        });

        createCard(rez);
      } else {
        createCard(result);
      }
    };


  });

