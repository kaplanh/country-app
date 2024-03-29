//? api linki :  https://restcountries.com/v3.1/all

//! Tum sayfa yuklendiginde getData() fonk calistirarak  API'deki datayi indir ve  ulke isimlerini select'e bas

//? 1.yazim sekli

window.addEventListener("load", () => {
    getData();
});

//? 2.yazim sekli
// window.onload = function () {
//   getData();

// }

// !API den datalari ceken fonksiyon

let ülkeler; //?datayi globale cekmek icin

const getData = async () => {
    try {
        const URL = "https://restcountries.com/v3.1/all";
        const res = await fetch(URL);
        if (!res.ok) {
            throw new Error();
        }
        const data = await res.json();
        ülkeler = data; //?datayi countries e aktararak  globale cektim
        // console.log(ülkeler);
        nameSelect(data);

        // console.log(data);
    } catch (error) {
        // console.log(error);
        renderError(error);
    }
};

const renderError = (error) => {
    const cardSection = document.getElementById("cards");
    cardSection.innerHTML = `<img src="./img/404.png" alt="" />`;
};

const select = document.querySelector(".form-select"); //?event dada kullanmak icin disarda tanimladim
//?select'te  ulke ismi degistiginde secilen ulkenin bilgilerini
//? Card olarak DOM'a bas

const nameSelect = (data) => {
    ülkeler.forEach((element) => {
        // console.log(element);
        ülkeler = data; //?datayi countries e aktararak  globale cektim
        ülkeler.sort((a, b) => {
            const nameA = a.name.common.toUpperCase();
            const nameB = b.name.common.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });

        // ! Yukarda ulkeleri siralayarak çalıştırılıyoruz
        select.innerHTML += `<option value=${element.name.common}>${element.name.common}</option>`;
    });
    // domaYaz(data)
};

select.addEventListener("change", (e) => {
    const selected = e.currentTarget.value; //?currenttarget select 'i isaret eder
    console.log(selected);
    if (selected) {
        // console.log(ülkeler);
        const secilenUlke = ülkeler.filter((item) => {
            return item.name.common === selected;
        });
        console.log(secilenUlke);
        domaYaz(secilenUlke[0]);
    }
});

const domaYaz = (y) => {
    const {
        flags: { png }, //?nested objectlerde destructuring
        name: { common }, //?nested objectlerde destructuring
        region,
        capital,
        languages,
        currencies,
        population,
        borders,
        maps: { googleMaps }, //?nested objectlerde destructuring
    } = y;

    const cardSection = document.getElementById("cards");
    cardSection.innerHTML = `<div class="card m-auto mt-1" style="width: 25rem;">
            <img src="${png}" class="card-img-top " style="height:200px" alt="..." />
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
