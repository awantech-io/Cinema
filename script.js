const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row.seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// get selected movie ticket price in number format
let ticketPrice = +movieSelect.value;

// save selected movie index & price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // set seat to array
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    //console.log(seatsIndex);

    // save selected seat to localstorage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    // get the total selected seat
    const selectedSeatsCount = selectedSeats.length;
    
    // put the seat count & total ticket price to display
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice; 
}

// Movie select event
movieSelect.addEventListener('change', e =>{
    ticketPrice = +e.target.value;
    
    // set selected movie index and price
    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
    // select only seat that not occupied
    if (e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')){
        // toggle the seat selected or unselected
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

