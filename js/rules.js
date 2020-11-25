var count = 0;

window.addEventListener("load", () => {
	var img = document.getElementById("image-opacity");

	fadeOut(img);
});

function mute() {
	if(document.getElementById("volume").muted == true){
		document.getElementById("volume").muted = false;
		document.getElementById("button-mute").innerHTML = "Couper le son";
	}else{
		document.getElementById("volume").muted = true;
		document.getElementById("button-mute").innerHTML = "Remettre le son";
	}
}

const fadeOut = (elem, opacity = 1.0) => {
	var bubble = document.getElementById("bubble-container");
	var money = document.getElementById("money-container");

	opacity -= 0.02;

    if (opacity < 0.2) {
		opacity = 0;
		elem.style.display = "none";
		fadeIn(bubble);
		money.style.visibility = "visible";
	}

    elem.style.opacity = opacity;

    if (opacity > 0) {
        setTimeout(() => {
            fadeOut(elem, opacity)
        }, 50);
    }
}

const fadeIn = (elem, opacity = 0.0) => {
	elem.style.visibility = "visible";
	opacity += 0.02;

    if (opacity > 1) {
		opacity = 1;
	}

    elem.style.opacity = opacity;

    if (opacity > 0) {
        setTimeout(() => {
            fadeIn(elem, opacity)
        }, 30);
    }
}

function buttonContinue(){
	let title = document.getElementById("bubble-title");
	let text = document.getElementById("bubble-text");
	let casinoman = document.getElementById("casinoman");
	let bubble = document.getElementById("bubble-button");

	bubble.style.marginTop = 0 + "px";

	count++;

	// Il y a beaucoup de code, mais il sert à aligner le casinoman.
	switch(count) {
		case 1:
		  title.innerHTML = "Le but du jeu.";
		  text.innerHTML = "Vous allez jouer contre le croupier, votre but, le battre. Pour y arriver vous devez être le plus proche possible de 21 sans dépasser.";
		  casinoman.src = "SpriteSheet/businessman-doing-different-actions/pointe.png";
		  casinoman.style.marginTop = 15 + "px";
		  casinoman.style.marginLeft = 18 + "px";
		  casinoman.style.width = 70 + "px";
		  break;
		case 2:
		  title.innerHTML = "Les cartes.";
		  text.innerHTML = "Au blackjack les cartes sont spéciales. Tous les valets, reines et rois valent 10. Les as valent 1 ou 11 selon la situation.";
		  casinoman.src = "SpriteSheet/businessman-doing-different-actions/bras-hanche.png";
		  casinoman.style.marginTop = 17 + "px";
		  casinoman.style.marginLeft = 8 + "px";
		  break;
		case 3:
		  title.innerHTML = "Les options.";
		  text.innerHTML = "Vous aurez 4 choix par tour de jeu: tirer, rester, doubler (qui ne pioche que une carte et qui double votre mise) et séparer (si vos cartes sont pareils lors de la première pige (cette option double votre mise)).";
		  bubble.style.marginTop = -15 + "px";
		  casinoman.src = "SpriteSheet/businessman-doing-different-actions/une-main-hanche.png";
		  casinoman.style.marginTop = 19 + "px";
		  casinoman.style.width = 60 + "px";
		  casinoman.style.height = 110 + "px";
		  break;
		case 4:
		  title.innerHTML = "Le Blackjack.";
		  text.innerHTML = "Winner winner chicken dinner, si vous avez 21 vous gagnez automatiquement, Idem pour le croupier.";
		  casinoman.src = "SpriteSheet/businessman-doing-different-actions/pointe.png";
		  casinoman.style.marginTop = 15 + "px";
		  casinoman.style.marginLeft = 18 + "px";
		  casinoman.style.width = 70 + "px";
		  casinoman.style.height = 120 + "px";
		  break;
		case 5:
		  title.innerHTML = "Les mises.";
		  text.innerHTML = "Vous allez faire une mise de départ, doubler permet de doubler cette mise et séparer double aussi votre mise.";
		  casinoman.src = "SpriteSheet/businessman-doing-different-actions/bras-hanche.png";
		  casinoman.style.marginTop = 17 + "px";
		  casinoman.style.marginLeft = 8 + "px";
		  casinoman.style.width = 70 + "px";
		  casinoman.style.height = 120 + "px";
		  break;
		case 6:
		  title.innerHTML = "Assurance.";
		  text.innerHTML = "Si le croupier obtient un as lors de la première pige vous avez le droit à une assurance, elle représente la moitié de votre mise et si le croupier a Blackjack vous obtenez 1,5X de votre mise de départ.";
		  bubble.style.marginTop = -15 + "px";
		  casinoman.src = "SpriteSheet/businessman-doing-different-actions/bras-hanche.png";
		  break;
		case 7:
		  title.innerHTML = "Le croupier.";
		  text.innerHTML = "Le croupier ne tire jamais sur 17. Par contre, vous pouvez tirer n'importe quand!";
		  casinoman.src = "SpriteSheet/businessman-doing-different-actions/une-main-hanche.png";
		  casinoman.style.marginTop = 19 + "px";
		  casinoman.style.height = 110 + "px";
		  casinoman.style.width = 60 + "px";
		  break;
		case 8:
		  title.innerHTML = "Votre argent.";
		  text.innerHTML = "Vous êtes venu les mains vides? Casino Royal vous offre 1000$! Jouez avec modération!.";
		  document.getElementById("money-count").innerHTML = "1000$";
		  casinoman.src = "SpriteSheet/businessman-doing-different-actions/main-en-lair.png";
		  casinoman.style.marginTop = 11 + "px";
		  casinoman.style.marginLeft = 3 + "px";
		  casinoman.style.width = 90 + "px";
		  casinoman.style.height = 120 + "px";
		  break;
		case 9:
		  title.innerHTML = "Vous êtes prêt?";
		  text.innerHTML = "";
		  document.getElementById("continue").style.display = "none";
		  bubble.style.marginTop = 40 + "px";
		default:
	}
}

function jouer(){
	window.location.href = "game.html";
}