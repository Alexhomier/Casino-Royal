/*****************************************
Author: Alexandre Homier
Version: 1.0
Description: Blackjack game
BUG: 437
******************************************/

let VOLUME = 0.07
let MONEY_COUNT;
let BET = 0;

let CHIP_COUNT = 0;
let CARD_COUNT_DEALER = 0;
let CARD_COUNT_PLAYER = 0;
let COUNT_PLAYER = 0;
let COUNT_DEALER = 0;
let TOP_POSITION_CARD_DEALER = 45;
let LEFT_POSITION_CARD_DEALER = 590;
let TOP_POSITION_CARD_PLAYER = 400;
let LEFT_POSITION_CARD_PLAYER = 580;
let VALUE_FIRST_CARD_DEALER = 0;
let NUM_DEALER = 0;
let NUM_DEALER_CARD_2 = 0;
let ACE_PLAYER = 0;
let ACE_DEALER = 0;
let INSURANCE = false;
let DOUBLE = false;
let ACE_CHANGE = false;
let ID;

let spriteListChip = [];
let spriteListCardDealer = [];
let spriteListCardPlayer = [];
let USED_SYMBOLE = [];
let USED_NUM = [];
let SYMBOLE = ["carreau", "pique", "coeur", "trefle"];
let NUM = ["as", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];


window.addEventListener("load", () => {
	getMoney();
	setMoney(MONEY_COUNT);
	tick();
	audio();
	getResolution();
});

window.addEventListener("unload", () => {
	localStorage["MONEY"] = MONEY_COUNT;
});

function getMoney() {
	MONEY_COUNT = localStorage["MONEY"];
	if(MONEY_COUNT == null){
		alert("Vous êtes chanceux due à la première version du jeu vous ne serez jamais à sec");
		localStorage["MONEY"] = 1000;
	}
}

// Define resolution of the screen
function getResolution() {
	if(screen.width == 1280 && screen.height == 720){
		TOP_POSITION_CARD_DEALER = 45;
		LEFT_POSITION_CARD_DEALER = 590;
		TOP_POSITION_CARD_PLAYER = 400;
		LEFT_POSITION_CARD_PLAYER = 580;
	}
	else
		if(screen.width == 1920 && screen.height == 1080){
			TOP_POSITION_CARD_DEALER = 60;
			LEFT_POSITION_CARD_DEALER = 900;
			TOP_POSITION_CARD_PLAYER = 680;
			LEFT_POSITION_CARD_PLAYER = 900;
		}
		else{
			document.getElementById("body").remove;
			document.getElementById("html").innerHTML = "ERREUR, VEUILLEZ AJUSTER VOTRE RÉSOLUTION À 1920x1080 ou 1280x720";
		}
}

/* set volume of the audio */
function audio() {
	let audio = document.getElementById("audio");
	audio.volume = "0.07";
}
/* Volume up */
function audioUp() {
	audio = document.getElementById("audio");
	let up;

	VOLUME += 0.1;
	up = VOLUME.toString();
	audio.volume = up;
}
/* Volume down */
function audioDown() {
	audio = document.getElementById("audio");
	let down;

	VOLUME -= 0.1;
	down = VOLUME.toString();
	audio.volume = down;
}

/* Mute function for the  audio */
function playPause() {
	let audio = document.getElementById("audio");

	if (audio.paused) {
		audio.play();
		document.getElementById("button-mute").innerHTML = "Désactiver la musique";
	} else {
		audio.pause();
		document.getElementById("button-mute").innerHTML = "Activer la musique";
	}
}

/* Set the money in the game */
function setMoney(money) {
	let moneyId = document.getElementById("money-count");

	if(money > 9999999)
		moneyId.innerHTML = "Too much";
	else
		moneyId.innerHTML = money + "$";
}

/* Set bet in the game */
function setBet(bet) {
	let moneyBet = document.getElementById("money-bet");
	moneyBet.innerHTML = bet + "$";
}

/* For each bet - Money and + bet, add a chip on the table, work with GameChip.js */
function bet(obj) {
	let un = document.getElementById("table-bet-1");
	let cinq = document.getElementById("table-bet-5");
	let cent = document.getElementById("table-bet-100");
	let cinqCent = document.getElementById("table-bet-500");
	let bet = 0;

	switch(obj){
		case un:
			ID = "table-bet-1";
			bet += 1;
			break;
		case cinq:
			ID = "table-bet-5";
			bet += 5;
			break;
		case cent:
			ID = "table-bet-100";
			bet += 100;
			break;
		case cinqCent:
			ID = "table-bet-500";
			bet += 500;
			break;
		default:
	}

	if(bet > MONEY_COUNT) {
		alert("Vous n'avez pas assez d'argent.");
		betReset();
	}else{
		MONEY_COUNT -= bet;
		BET += bet;
		CHIP_COUNT++;
		spriteListChip.push(new Chip("Chip_" + CHIP_COUNT, "bet"));
	}

	bet = 0;
	setBet(BET);
	setMoney(MONEY_COUNT);
}

/* Give the money back to the player and clear Bet and table of the chips */
function betReset() {
	let moneyBet = document.getElementById("money-bet");

	moneyBet.innerHTML = 0 + "$";

	MONEY_COUNT += BET;
	BET = 0;

	removeAllChips();

	setBet(BET);
	setMoney(MONEY_COUNT)
}

/* Remove every Chips on the table, work with betReset() */
function removeAllChips() {
	let myNode = document.getElementById("bet-container");

	while (myNode.firstChild) {
		myNode.removeChild(myNode.lastChild);
	}
}

/* Onclick remove bet menu and add playing menu */
function betDone() {
	if(BET == 0){
		alert("Vous devez ajouter une mise.");
	}
	else{
		document.getElementById("table-bet-container").style.visibility = "hidden";
		document.getElementById("table-button-container").style.visibility = "visible";
		document.getElementById("count-card-dealer-container").style.visibility = "visible";
		document.getElementById("count-card-player-container").style.visibility = "visible";
		play();
	}
}

/* Call functions to hit cards */
function play() {
	hitDealer();
	setTimeout(hitPlayer, 800);
	setTimeout(hitPlayer, 1200);
	setTimeout(hitDealer, 1500);
}

/* Dealer's hits, create object, associate with GameCard */
function hitDealer() {
	let symboleDealer, numDealer, leftDealer, topDealer, whoDealer, wichCardDealer;
	let firstDealerCard = false;

	CARD_COUNT_DEALER++;
	whoDealer = "dealer";
	wichCardDealer = randomCard();
	symboleDealer = wichCardDealer[1];
	numDealer = wichCardDealer[0];

	if (CARD_COUNT_DEALER == 1){
		topDealer = TOP_POSITION_CARD_DEALER;
		leftDealer = LEFT_POSITION_CARD_DEALER;

		firstDealerCard = true;
		NUM_DEALER = numDealer; // used in stand() and in inssurance()
	}
	else{
		topDealer = TOP_POSITION_CARD_DEALER;
		LEFT_POSITION_CARD_DEALER += 20;
		leftDealer = LEFT_POSITION_CARD_DEALER;

		countCard(wichCardDealer[0], whoDealer);
		NUM_DEALER_CARD_2 = numDealer;
		if(numDealer == "as" && CARD_COUNT_DEALER == 2)
			insurance();
	}

	spriteListCardDealer.push(new Card("Dealer_Card_" + CARD_COUNT_DEALER, symboleDealer, numDealer, topDealer, leftDealer, whoDealer, firstDealerCard));

	document.getElementById("card-audio").play();
}

/* Player's hits, create object, associate with GameCard */
function hitPlayer() {
	let symbolePlayer, numPlayer, leftPlayer, topPlayer, whoPlayer, wichCardPlayer;
	let firstDealerCard = false;

	CARD_COUNT_PLAYER++;
	whoPlayer = "player";
	wichCardPlayer = randomCard();

	if(CARD_COUNT_PLAYER == 1) {
		symbolePlayer = wichCardPlayer[1];
		numPlayer = wichCardPlayer[0];
	}else{
		symbolePlayer = wichCardPlayer[1];
		numPlayer = wichCardPlayer[0];
	}
	TOP_POSITION_CARD_PLAYER -= 8;
	topPlayer = TOP_POSITION_CARD_PLAYER;
	LEFT_POSITION_CARD_PLAYER += 12;
	leftPlayer = LEFT_POSITION_CARD_PLAYER;

	countCard(wichCardPlayer[0], whoPlayer);
	spriteListCardPlayer.push(new Card("Player_Card_" + CARD_COUNT_PLAYER, symbolePlayer, numPlayer, topPlayer, leftPlayer, whoPlayer, firstDealerCard));
	conditionOver();

	document.getElementById("card-audio").play();
}

/* Give a random card from the card deck, never pick 2 same cards */
function randomCard() {
	let badCard = false;
	let indexSymbole = 0;
	let indexNum = 0;
	let symbole, number;
	let cardNumber = 50;

	do{
		indexSymbole = Math.round(Math.random() * 3);
		indexNum = Math.round(Math.random() * 12);

		symbole = SYMBOLE[indexSymbole];
		number = NUM[indexNum];

		for(let i = 0 ; i < USED_SYMBOLE.length ; i++)
			if(symbole == USED_SYMBOLE[i] && number == USED_NUM[i])
				badCard = true;
			else
				badCard = false;
	}while(badCard);

	USED_SYMBOLE.push(symbole);
	USED_NUM.push(number);

	if(USED_SYMBOLE.length > cardNumber){
		USED_SYMBOLE.length = 0;
		USED_NUM.length = 0;
		alert("Appuyez sur continuer pour brasser le paquet.");
		alert("Brassage terminé!");
	}

	return [number, symbole];
}

/* Give the number of points depending the card number */
function countCard(num, who) {
	switch(num) {
		case "as":
			if (COUNT_PLAYER <= 10 || COUNT_DEALER <= 10)
				if(who == "player"){
					COUNT_PLAYER += 11;
					ACE_PLAYER++;
				}else{
					COUNT_DEALER += 11;
					ACE_DEALER++;
				}
			else
				if(COUNT_PLAYER > 10 || COUNT_DEALER > 10)
				if(who == "player"){
					COUNT_PLAYER += 1;
					ACE_CHANGE = true;
				}
				else{
					COUNT_DEALER += 1;
					ACE_CHANGE = true;
				}
			break;
		case "2":
			if(who == "player")
				COUNT_PLAYER += 2;
			else
				COUNT_DEALER += 2;
			break;
		case "3":
			if(who == "player")
				COUNT_PLAYER += 3;
			else
				COUNT_DEALER += 3;
			break;
		case "4":
			if(who == "player")
				COUNT_PLAYER += 4;
			else
				COUNT_DEALER += 4;
			break;
		case "5":
			if(who == "player")
				COUNT_PLAYER += 5;
			else
				COUNT_DEALER += 5;
			break;
		case "6":
			if(who == "player")
				COUNT_PLAYER += 6;
			else
				COUNT_DEALER += 6;
			break;
		case "7":
			if(who == "player")
				COUNT_PLAYER += 7;
			else
				COUNT_DEALER += 7;
			break;
		case "8":
			if(who == "player")
				COUNT_PLAYER += 8;
			else
				COUNT_DEALER += 8;
			break;
		case "9":
			if(who == "player")
				COUNT_PLAYER += 9;
			else
				COUNT_DEALER += 9;
			break;
		case "10":
			if(who == "player")
				COUNT_PLAYER += 10;
			else
				COUNT_DEALER += 10;
			break;
		case "J":
			if(who == "player")
				COUNT_PLAYER += 10;
			else
				COUNT_DEALER += 10;
			break;
		case "Q":
			if(who == "player")
				COUNT_PLAYER += 10;
			else
				COUNT_DEALER += 10;
			break;
		case "K":
			if(who == "player")
				COUNT_PLAYER += 10;
			else
				COUNT_DEALER += 10;
			break;
		default:
	}

	if(who == "player"){
		document.getElementById("count-card-player").innerHTML = COUNT_PLAYER;
	}else
		document.getElementById("count-card-dealer").innerHTML = COUNT_DEALER;
}

/* condition for ace */
function ace() {
	if(ACE_CHANGE == false){
		if(ACE_PLAYER == 1 && COUNT_PLAYER >= 11){
			COUNT_PLAYER -= 10;
			ACE_PLAYER--;
		}
		if(ACE_DEALER == 1 && COUNT_DEALER >= 11){
			COUNT_DEALER -= 10;
			ACE_DEALER--;
		}
	}
}

/* Condition if the player lose the game */
function conditionOver() {
	if(COUNT_PLAYER > 21)
		endGame("lose");
	if(COUNT_PLAYER == 21 && CARD_COUNT_PLAYER == 2)
		endGame("win");
	if(COUNT_DEALER == 21 && CARD_COUNT_DEALER == 2)
		endGame("lose");
}

/* Onclick stand, it start dealer's tour */
function stand() {
	let sprite = spriteListCardDealer[0];
	sprite.stand();

	countCard(NUM_DEALER, "dealer");

	while(COUNT_DEALER < 17){
		//setTimeout(hitDealer, 500);
		hitDealer();
	}

	if(COUNT_DEALER > 21)
		endGame("win");
	else
		if(COUNT_DEALER > COUNT_PLAYER)
			endGame("lose");
		else
			if(COUNT_DEALER == COUNT_PLAYER)
				endGame("even");
			else
				if(COUNT_DEALER < COUNT_PLAYER)
					endGame("win");

}

/* Double the bet */
function double() {
	BET += BET;
	MONEY_COUNT -= BET;

	setBet(BET);
	setMoney(MONEY_COUNT);

	hitPlayer();
	conditionOver();
	setTimeout(stand, 1000);
}

/* Assurance if the first card of the dealer is an ace */
function insurance() {
	let insurance = document.getElementById("insurance");
	let titleInsurance = document.getElementById("insurance-title");
	let cost = 0;
	insurance.style.visibility = "visible";
	titleInsurance.style.visibility = "visible";

	cost = BET * 0.5;
	if(MONEY_COUNT < cost)
		document.getElementById("insurance-yes").style.visibility = "hidden";

	if(NUM_DEALER == "10" || NUM_DEALER == "J" || NUM_DEALER == "Q" || NUM_DEALER == "K")
		endGame("lose");
}

/* Onclick yes for assurance */
function insuranceYes() {
	let cost = 0;
	INSURANCE = true;
	cost = BET * 0.5;
	MONEY_COUNT -= BET * 0.5;
	setMoney(MONEY_COUNT);

	document.getElementById("insurance").style.visibility = "hidden";
	document.getElementById("insurance-title").style.visibility = "hidden";
	document.getElementById("insurance-bet").style.visibility = "visible";
	document.getElementById("insurance-bet-value").innerHTML = cost;
}

/* Onclick no for the insurance */
function insuranceNo() {
	document.getElementById("insurance").style.visibility = "hidden";
	document.getElementById("insurance-title").style.visibility = "hidden";
}

/* Give the signal of if you winned, losted or evened the game */
function endGame(status){
	let img = document.getElementById("endgame-img");
	let title = document.getElementById("endgame-announce-title");

	fadeIn(img, 0.0);

	if(status == "win"){
		title.innerHTML = "VOUS AVEZ GAGNÉ!!!";
		title.style.color = "green";
		MONEY_COUNT += BET * 2
		setMoney(MONEY_COUNT);
	}else
		if(status == "lose"){
			title.innerHTML = "VOUS AVEZ PERDU!";
			title.style.color = "red";
			if(INSURANCE == true && ACE_DEALER > 0){
				MONEY_COUNT += BET * 1.5;
				setMoney(MONEY_COUNT);
			}
		}else
			if(status == "even"){
				title.innerHTML = "ÉGALITÉ!";
				title.style.color = "rgb(209, 188, 3)";
				MONEY_COUNT += BET;
				setMoney(MONEY_COUNT);
			}
}

/* Onclick continue = erase everything start a new game */
function newGame(){
	removeAllChips();
	setBet("0");

	BET = 0;
	COUNT_DEALER = 0;
	COUNT_PLAYER = 0;
	CARD_COUNT_DEALER = 0;
	CARD_COUNT_PLAYER = 0;
	TOP_POSITION_CARD_DEALER = 45;
	LEFT_POSITION_CARD_DEALER = 590;
	TOP_POSITION_CARD_PLAYER = 400;
	LEFT_POSITION_CARD_PLAYER = 580;

	document.getElementById("count-card-player").innerHTML = COUNT_PLAYER;
	document.getElementById("count-card-dealer").innerHTML = COUNT_DEALER;
	document.getElementById("table-bet-container").style.visibility = "visible";
	document.getElementById("table-button-container").style.visibility = "hidden";
	document.getElementById("count-card-dealer-container").style.visibility = "hidden";
	document.getElementById("count-card-player-container").style.visibility = "hidden";
	document.getElementById("endgame-img").style.visibility = "hidden";
	document.getElementById("endgame-announce-container").style.visibility = "hidden";
	document.getElementById("insurance-bet").style.visibility = "hidden";

	for(let i = 0; i < spriteListCardDealer.length; i++){
		let count = 1 + i;
		let value = count.toString();
		let dealerCard = "Dealer_Card_" + value;
		document.getElementById(dealerCard).remove();
	}
	for(let i = 0; i < spriteListCardPlayer.length; i++){
		let count = 1 + i;
		let value = count.toString();
		let playerCard = "Player_Card_" + value;
		document.getElementById(playerCard).remove();
	}

	spriteListChip.length = 0;
	spriteListCardDealer.length = 0;
	spriteListCardPlayer.length = 0;
}

/* Fade for the black screen, used for endGame() */
const fadeIn = (elem, opacity = 0.0) => {
	img = document.getElementById("endgame-img");
	div = document.getElementById("endgame-announce-container");

	img.style.visibility = "visible";
	opacity += 0.02;

    if (opacity > 1) {
		opacity = 1;
	}

    img.style.opacity = opacity;

    if (opacity < 0.6) {
        setTimeout(() => {
            fadeIn(elem, opacity)
        }, 30);
	}else
		div.style.visibility = "visible";
}

/* Animate the cards */
function tick(who){
	for(let i = 0; i < spriteListCardDealer.length; i++){
		let sprite = spriteListCardDealer[i];
		sprite.tick();
	}

	for(let i = 0; i < spriteListCardPlayer.length; i++){
		let sprite = spriteListCardPlayer[i];
		sprite.tick();
	}
	ace();
	window.requestAnimationFrame(tick);
}

/* Get the variable ID, used in GameChip.js */
function getId(){
	return ID;
}
