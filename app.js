//? api linki :  https://restcountries.com/v3.1/all

//? Tum sayfa yuklendiginde getData() fonk calistirarak  API'deki datayi indir ve  ulke isimlerini select'e bas

//? 1.yazim sekli
window.addEventListener("load", () => {
  getData();
});

//? 2.yazim sekli
// window.onload = function () {
//   getData();
// }

let countries; //?datayi globale cekmek icin

//? datayi apiden cekme fonk.
const getData = async () => {
  try {
    const URL = "https://restcountries.com/v3.1/all";
    const res = await fetch(URL);
    if (!res.ok) {
      renderError(`Something went wrong:${res.status}`);
      throw new Error();
    }
    const data = await res.json();
    countries = data; //?//?datayi countries e aktararak  globale cektim
    // console.log(countries);
    nameSelect(countries);
    
    // console.log(data);
  } catch (error) {
    console.log(error);
    
  }
};
//? hata olmasi durumunda DOM'a
const renderError = (err) => {
  const countries = document.querySelector(".cards");
  countries.innerHTML = `
    <h3 class="text-danger">${error}</h3>
    <img src='./404.png' alt="" />
  `;
};

//?select'te  ulke ismi degistiginde secilen ulkenin bilgilerini
//? Card olarak DOM'a bas

const nameSelect = (countries) => {
  const select = document.querySelector(".form-select");
  countries.forEach((element) => {//?
    // console.log(element);

    select.innerHTML += `<option value=${element.name.common}>${element.name.common}</option>`;
  });
  
};

select.addEventListener("change", (e) => {
  const selected = e.currentTarget.value;
  // console.log(selected);
  if (selected) {
    // console.log(countries);
    const selectedCountry = countries.filter((item) => {
      return item.name.common === selected;
    });
    // console.log(selectedCountry);
    domaYaz(selectedCountry[0]);
  }
});


//? Ulke bilgilerini card'a  basan fonksiyon

const domaYaz = (country) => {
  const {
    flags: { png }, //?nested objectlerde destructuring
    name: { common },
    region,
    capital,
    languages,
    currencies,
    population,
    borders,
    maps: { googleMaps },
  } = country;

  const cardSection = document.getElementById("cards");
  cardSection.innerHTML = `<div class="card m-auto mt-4" style="width: 28rem">
            <img src="${png}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title fs-2">${common}</h5>
            </div>
                <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <i class="fa-solid fa-earth-oceania"></i><span class="fw-bold"> Region:</span> ${region}
            </li>
            <li class="list-group-item">
              <i class="fas fa-lg fa-landmark"></i>
              <span class="fw-bold"> Capitals:</span> ${capital}
            </li>
            <li class="list-group-item">
              <i class="fas fa-lg fa-comments"></i>
              <span class="fw-bold"> Languages:</span>${Object.values(
                languages
              )}
            </li>
            <li class="list-group-item">
              <i class="fas fa-lg fa-money-bill-wave"></i>
              <span class="fw-bold"> Currencies:</span> ${
                Object.values(currencies)[0].name //?Object.values() metodunun ciktisi array dir
              }, ${Object.values(currencies)[0].symbol}
            </li>
            <li class="list-group-item">
            <i class="fa-solid fa-people-group"></i></i>
            <span class="fw-bold"> Population:</span> ${population}
          </li>
            <li class="list-group-item">
            <i class="fa-sharp fa-solid fa-road-barrier"></i>
            <span class="fw-bold"> Borders:</span> ${borders}
          </li>
          </li>
          <li class="list-group-item">
            <i class="fa-solid fa-map-location-dot"></i><span class="fw-bold"> Map:</span> <a href=${googleMaps}
               target='_blank'> Go to google map</a> </li>
          </ul>
      </div>`;
};
