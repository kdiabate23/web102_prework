/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // const games = GAMES_JSON;

    // loop over each item in the data
    for(let game of games){

        // create a new div element, which will become the game card
        const gamecard = document.createElement("div");

        // add the class game-card to the list
        gamecard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")

        gamecard.innerHTML = `
           <img src=${game.img} class="game-img" />
           <h3>${game.name}</h3>
           <p>${game.description}</p>
           <p>Backers: ${game.backers}<p>
           <p>${game.pledged}</p>
           <p>${game.goal}</p>
           
        `;

        // append the game to the games-container
        gamesContainer.append(gamecard);

        

    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

var num = GAMES_JSON.reduce((acc, contr) =>{
    return acc + contr.backers;
}, 0);
console.log(num);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.textContent = `${num.toLocaleString('en-US')}`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaise = GAMES_JSON.reduce((acc, raise) =>{
    return acc + raise.pledged;
}, 0);

console.log(totalRaise);


// set inner HTML using template literal
raisedCard.textContent = `$${totalRaise.toLocaleString('en-US')}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const numgames = GAMES_JSON.length;
gamesCard.textContent = `${numgames}`;

console.log(numgames);


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    let games = GAMES_JSON;

    // use filter() to get a list of games that have not yet met their goal
    let listOfUnfundedGames = games.filter ( (game) => {
        return game.pledged < game.goal;
      });

      console.log(listOfUnfundedGames);

   
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfundedGames);


}

filterUnfundedOnly();


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    let games = GAMES_JSON;
    // use filter() to get a list of games that have met or exceeded their goal
    let listOfFundedGames = games.filter ( (game) => {
        return game.pledged >= game.goal;
      });

      console.log(listOfFundedGames);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfFundedGames);

}




// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    let games = GAMES_JSON;

    // add all games from the JSON data to the DOM
    addGamesToPage(games);
    console.log(games);

}

// showAllGames(GAMES_JSON);

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

var allbooks = GAMES_JSON.filter ( (game) => {
    return game.pledged >= game.goal;
  });

  console.log(allbooks);

  var unfund = numgames - allbooks.length;
  var fund = allbooks.length;

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${totalRaise.toLocaleString('en-US')} has been raised for ${numgames} games.currently, ${unfund} ${unfund > 1? "games remain unfunded. we need your help to fund these amazing games!" : " game remains unfunded. we need your help to fund these amazing games!"}`;
console.log(unfund);
console.log(displayStr);

// create a new DOM element containing the template string and append it to the description container
const displayDes = document.createElement("p");    //Create a new <p> element
const text = document.createTextNode(displayStr);  
displayDes.appendChild(text);                      //append the text node
descriptionContainer.appendChild(displayDes);      

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
console.log(sortedGames);
// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames;
console.log(firstGame); 
console.log(secondGame);

// create a new element to hold the name of the top pledge game, then append it to the correct element
const displayTop = document.createElement("p");    //Create a new <p> element
const topFund = document.createTextNode(firstGame.name);  
displayTop.appendChild(topFund);                      //append the text node
firstGameContainer.appendChild(displayTop);


// do the same for the runner up item
const displaySec = document.createElement("p");    //Create a new <p> element
const secFund = document.createTextNode(secondGame.name);  
displaySec.appendChild(secFund);                      //append the text node
secondGameContainer.appendChild(displaySec);