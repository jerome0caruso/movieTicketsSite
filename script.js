const conatiner = document.querySelector(".container");//screen and seats
const allSeats = document.querySelectorAll(".row .seat");
const count = document.getElementById("count")//number in the text for tix qty
const total = document.getElementById("total")//acc. price of all tix
const movieSelect = document.getElementById("movie");//movie selector

populateUI();
var seatsIndex; //All the seats that 
function updateSelectedCount() {
    let ticketPrice = parseInt(movieSelect.value);//more clear than using +
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    seatsIndex = [...selectedSeats].map(seat => [...allSeats].indexOf(seat));//spread op. used to iterate over unknown amount of seats                                                                            //and grab the index of each seat
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));//Converts array of selected seats to string
    const selectedSeatsCount = selectedSeats.length;//length of node array of clicked seats
    count.textContent = selectedSeatsCount;//sets UI 
    total.textContent = ticketPrice * selectedSeatsCount;
}
function setMovieData(movieIndex, moviePrice){//saves movie index and price, value is from a click event 
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}
function populateUI(){ // get data from local storage for UI
    let selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));//sets LS"selectedSeats"
    if(selectedSeats !== null && selectedSeats.length > 0) {
        selectedSeats.map(item => allSeats[item].classList.add("selected"));//adds class selected to each seat
    }
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex =  selectedMovieIndex;
    }
}

function changeOccupied(index) {//This is in place of an API.  It seats different (occupied seats) for each movie
    if(index === 0) {           // and adds class selected to each individual movie 
        let zero = document.querySelectorAll(".zero");
        allSeats.forEach(seat => seat.classList.remove("occupied"))
        zero.forEach(zero => (zero.classList.add("occupied")))
        let selectedSeats = JSON.parse(localStorage.getItem("savedSeats0"));
        selectedSeats.forEach(seat => allSeats[seat].classList.add("selected"));
    } if(index === 1) {
        let one = document.querySelectorAll(".one");
        allSeats.forEach(seat => seat.classList.remove("occupied"))
        one.forEach(one => (one.classList.add("occupied")))
        let selectedSeats = JSON.parse(localStorage.getItem("savedSeats1"));
        selectedSeats.forEach(seat => allSeats[seat].classList.add("selected"));
    } if(index === 2) {
        let two = document.querySelectorAll(".two");
        allSeats.forEach(seat => seat.classList.remove("occupied"))
        two.forEach(two => (two.classList.add("occupied")))
        let selectedSeats = JSON.parse(localStorage.getItem("savedSeats2"));
        if(selectedSeats){
        selectedSeats.forEach(seat => allSeats[seat].classList.add("selected"));
        }
    } if(index === 3) {
        let three = document.querySelectorAll(".three");
        allSeats.forEach(seat => seat.classList.remove("occupied"))
        three.forEach(three => (three.classList.add("occupied")))
        let selectedSeats = JSON.parse(localStorage.getItem("savedSeats3"));
        if(selectedSeats){
        selectedSeats.forEach(seat => allSeats[seat].classList.add("selected"));
        }
    }
}
var moviePicked;//Index of the movie currently selected

movieSelect.addEventListener("change", e => { //on movie change adds index of option(movie) selected and
    moviePicked = e.target.selectedIndex;//clears previous "selected" seats for each option(movie)
    allSeats.forEach(seat => seat.classList.remove("selected"))
    if (!JSON.parse(localStorage.getItem("savedSeats0"))){//this adds all of the keys(blank) for the individual movies 
        localStorage.setItem("savedSeats0", JSON.stringify(seatsIndex))//if not there already 
    }
    if (!JSON.parse(localStorage.getItem("savedSeats1"))){ 
        seatsIndex = [];
        localStorage.setItem("savedSeats1", JSON.stringify(seatsIndex))
    }
    if (!JSON.parse(localStorage.getItem("savedSeats2"))){
        seatsIndex = [];
        localStorage.setItem("savedSeats2", JSON.stringify(seatsIndex))
    }
    if (!JSON.parse(localStorage.getItem("savedSeats3"))){
        seatsIndex = [];
        localStorage.setItem("savedSeats3", JSON.stringify(seatsIndex))
    }
    changeOccupied(moviePicked);
    //let ticketPrice = e.target.value;//updates ticket price when movie change on menu
    setMovieData(moviePicked, e.target.value);//grabs index of movie title and value for localStorage
    updateSelectedCount();  // . selectedIndex grabs the index of whatever was clicked (e.target)
})
window.onload = () =>{//When page is loaded or refreshed it keeps page that is was on before refresh
    let movieIn = localStorage.getItem("selectedMovieIndex");
    changeOccupied(parseInt(movieIn));
}

conatiner.addEventListener("click", (e) => {//Grabs all the seats available 
    if(e.target.classList.contains("seat") &&//new html method contains??
      !e.target.classList.contains("occupied"))
      {
        e.target.classList.toggle("selected")//adds the blue to selected seats
        updateSelectedCount();//it runs when click on available seat 
    } 
    if(seatsIndex && moviePicked === 0){// only sets local store if there is seat selected with seatsIndex and
        localStorage.setItem("savedSeats0", JSON.stringify(seatsIndex));//picked is for movie in index[?].
    } else if (seatsIndex && moviePicked === 1){
        localStorage.setItem("savedSeats1", JSON.stringify(seatsIndex));
    } else if (seatsIndex && moviePicked === 2){
        localStorage.setItem("savedSeats2", JSON.stringify(seatsIndex));
    } else if (seatsIndex && moviePicked === 3){
        localStorage.setItem("savedSeats3", JSON.stringify(seatsIndex));
    }
})
updateSelectedCount();