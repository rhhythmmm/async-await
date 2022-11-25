'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const getCountryData = function(country){
// const request = new XMLHttpRequest();

// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// request.addEventListener('load', function () {
//   const [data] = JSON.parse(this.responseText);
//   console.log(data);

//   const html = `<article class="country">
//           <img class="country__img" src="${data.flags.png}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${
//               (+data.population / 1000000).toFixed(1)
//             } people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//           </div>
//         </article>`;

//     countriesContainer.insertAdjacentHTML('beforeend', html)

//     countriesContainer.style.opacity = 1;
// });
// }

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const getCountryAndNeighbour = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //Render Country 1
    renderCountry(data);

    //Render Country 2

    const neighbour = data.borders?.[0];

    if (!neighbour) return;
    const request2 = new XMLHttpRequest();

    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v2/name/${country}`);
// request.send();

// const getCountryData = function(country){
//     fetch(`https://restcountries.com/v2/name/${country}`).then(function(response){
//         console.log(response);
//         return response.json();
//     }).then(function(data){
//         console.log(data);
//         renderCountry(data[0])
//     })
// }

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMessage} ${response.status}`);
    }
    return response.json();
  });
};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//         if(!response.ok)
//             throw new Error(`Country Not Found ${response.status}`)
//         return response.json()
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];

//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}💥💥💥💥💥`);
//       renderError(`Somthing went wrong 💥💥${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country Not Found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!');
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country Not Found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err}💥💥💥💥💥`);
      renderError(`Somthing went wrong 💥💥${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', function () {
//   getCountryData('china');
// });

// console.log('Test Start');
// setTimeout(()=>{
//     console.log('0 sec timer');
// }, 0)

// Promise.resolve('Resolved Promise 1').then(res => console.log(res));
// Promise.resolve('Resolved Promise 2').then(res => {
//     for(let i=0; i<100000; i++){};
//     console.log(res)
// });

// console.log('Test end');

// const lotteryPromise = new Promise(function(resolve, reject){
//     console.log('Lottery Draw Is Happening');
//     setTimeout(function(){if(Math.random >= 0.5){
//         resolve(new Error('You Win'))
//     }
//     else{
//         reject(new Error('You Lost Your Money'))
//     }},2000)
// })

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err))

// const wait = function(seconds){
//     return new Promise(function(resolve){
//         setTimeout(resolve, seconds*1000)
//     })
// }

// wait(2).then(()=> {
//     console.log(`I waited 2 seconds`)
//     return wait(1);
// }).then(console.log(`I waited 1 sec`));

const getPosition = function () {
    return new Promise(function (resolve, reject) {
      // navigator.geolocation.getCurrentPosition(
      //   position => resolve(position),
      //   err => reject(err)
      // );
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
  // getPosition().then(pos => console.log(pos));
  
  const whereAmI = function () {
    getPosition()
      .then(pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
  
        return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      })
      .then(res => {
        if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log(data);
        console.log(`You are in ${data.city}, ${data.country}`);
  
        return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
      })
      .then(res => {
        if (!res.ok) throw new Error(`Country not found (${res.status})`);
  
        return res.json();
      })
      .then(data => getCountryData(data[0]))
      .catch(err => console.error(`${err.message} 💥`));
  };
  
  btn.addEventListener('click', whereAmI);