async function pageLoaded() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let test = await response.json()

  // writes the returned JSON to the console
  // console.dir(test)
  
  for (let i = 0; i < test.length; i++) {
    showNoober(test[i])
  }
  // 🔥 start here: write code to loop through the rides
  
}
// Pool --> Purple --> Noober XL --> Noober X
function lvlofServiceRequired(ride) {
   // console.log('inlvlofService function')
  if (ride.length>1) {
    return 'Noober Pool'
  } else if (ride[0].purpleRequested) {
    return 'Noober Purple'
  } else if (ride[0].numberOfPassengers > 3) {
    return 'Noober XL'
  } else {return 'Noober X'}
}

window.addEventListener('DOMContentLoaded', pageLoaded)


function showNoober(ride) {
  let lvlofService = lvlofServiceRequired(ride)
  let nooberTypeOutput =   `<h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
  <i class="fas fa-car-side"></i>
  <span> ${lvlofService}</span>`
  outputElement.insertAdjacentHTML('beforeend', nooberTypeOutput)
  if (lvlofService == 'Noober Pool') {
    showNooberPool(ride)
  } else if (lvlofService == 'Noober Purple') {
    printBox(ride[0],'Purple')
  } else if (lvlofService == 'Noober XL') {
    printBox(ride[0],null)
  } else {
    printBox(ride[0],null)
  }
}

let outputElement = document.querySelector('.rides')
function showNooberPool(ride) {
  for (let i = 0; i < ride.length; i++) {
    printBox(ride[i],'pool')
  }
}

function printBox(ride , servicelvl) {
  let border
  let border2
  if (servicelvl == 'Purple') {
    border = 'border-4 border-purple-500 p-4 my-4 text-left'
    border2 = 'rounded-xl bg-purple-600 text-white p-2'
  } else { 
    border = 'border-4 border-gray-900 p-4 my-4 text-left'
    border2 = 'rounded-xl bg-gray-600 text-white p-2'
  }
  let name = `${ride.passengerDetails.first} ${ride.passengerDetails.last}`
  let numberOfPassengers = ride.numberOfPassengers
  let phoneNumber = ride.passengerDetails.phoneNumber
  let pickupaddress = ride.pickupLocation.address
  let pickupcitystatezip = `${ride.pickupLocation.city}, ${ride.pickupLocation.state} ${ride.pickupLocation.zip}`
  let dropoffaddress = ride.dropoffLocation.address
  let dropoffcitystatezip = `${ride.dropoffLocation.city}, ${ride.dropoffLocation.state} ${ride.dropoffLocation.zip}`
  
  if  (numberOfPassengers>1) {
    numberOfPassengers = `${numberOfPassengers} passengers`
  } else {
    numberOfPassengers = `${numberOfPassengers} passenger`
  }

  let outputText = 
  `<div class="${border}">
    <div class="flex">
      <div class="w-1/2">
        <h2 class="text-2xl py-1">${name}</h2>
        <p class="font-bold text-gray-600">${phoneNumber}</p>
      </div>
      <div class="w-1/2 text-right">
        <span class="${border2}">
          ${numberOfPassengers}
        </span>
      </div>
    </div>
    <div class="mt-4 flex">
      <div class="w-1/2">
        <div class="text-sm font-bold text-gray-600">PICKUP</div>
        <p>${pickupaddress}</p>
        <p>${pickupcitystatezip}</p>
      </div>
      <div class="w-1/2">
        <div class="text-sm font-bold text-gray-600">DROPOFF</div>
        <p>${dropoffaddress}</p>
        <p>${dropoffcitystatezip}</p>
      </div>
    </div>
  </div>`
  outputElement.insertAdjacentHTML('beforeend', outputText)
}