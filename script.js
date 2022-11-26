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
  countriesContainer.style.opacity = 1;
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

// const getPosition = function () {
//     return new Promise(function (resolve, reject) {
//       // navigator.geolocation.getCurrentPosition(
//       //   position => resolve(position),
//       //   err => reject(err)
//       // );
//       navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
//   };
//   getPosition().then(pos => console.log(pos));

//   const whereAmI = function () {
//     getPosition()
//       .then(pos => {
//         const { latitude: lat, longitude: lng } = pos.coords;

//         return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//       })
//       .then(res => {
//         if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//         return res.json();
//       })
//       .then(data => {
//         console.log(data);
//         console.log(`You are in ${data.city}, ${data.country}`);

//         return fetch(`https://restcountries.com/v2/name/${data.country}`);
//       })
//       .then(res => {
//         if (!res.ok) throw new Error(`Country not found (${res.status})`);

//         return res.json();
//       })
//       .then(data => getCountryData(data[0]))
//       .catch(err => console.error(`${err.message} 💥`));
//   };

//   btn.addEventListener('click', whereAmI);

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem Getting Location Data');
    const dataGeo = await resGeo.json();
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem Getting Location Data');
    const data = await res.json();
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`Something went wrong 💥 ${err.message}`);
  }
};

// console.log(`1: Will Get The Location`);
// const city = whereAmI();
// console.log(city);
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log(`3: Finished Getting the Loaction`));

// (async function(){
//   try{
//     const city = await whereAmI();
//   }
//   catch(err){
//     console.error(`2: ${err.message} 💥`)
//   }
//   console.log(`3: Finished Getting the Loaction`)
// })

// try {
//   let x = 1;
//   const y = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
//     // console.log([data1.capital, data2.capital, data3.capital]);

//     const data = await Promise.all([
//       await getJSON(`https://restcountries.com/v2/name/${c1}`),
//       await getJSON(`https://restcountries.com/v2/name/${c2}`),
//       await getJSON(`https://restcountries.com/v2/name/${c3}`),
//     ]);
//     console.log(data.map(d=> d[0].capital))
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('china', 'russia', 'portugal');

(async function(){
  const res = await Promise.race([
    await getJSON(`https://restcountries.com/v2/name/italy`),
    await getJSON(`https://restcountries.com/v2/name/egypt`),
    await getJSON(`https://restcountries.com/v2/name/china`),
  ])
  console.log(res[0]);
})();

const timeout = function(sec){
  return new Promise(function(_, reject){
    setTimeout(function(){
      reject(new Error('Request Took Too Long!!!'))
    },sec*1000)
  })
}

Promise.race([
  getJSON(`https://restcountries.com/v2/name/china`),timeout(1)
]).then(res => console.log(res[0])).catch(err => console.log(err))

// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another Success'),
// ]).then(res => console.log(res))

Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res))