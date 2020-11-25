let spriteList = [];
var CHIP_COUNT = 0;
let leftPosition

function Move(obj) {
	CHIP_COUNT++;
	spriteList.push(new Chip("Chip_" + CHIP_COUNT));

	leftPosition = Math.random() * 1200;

	if(leftPosition <= 25){
		leftPosition = 25;
	}
	document.getElementById("chip").style.left = leftPosition + "px";
	document.getElementById("chip").style.top = -100 + "px";

}

window.addEventListener("load", () => {
    tick();
})

// À chaque 15msec, refaire tick
const tick = () => {
	for(let i = 0 ; i < spriteList.length ; i++){
		const sprite = spriteList[i];
		sprite.tick(); // Anime le sprite!
	}
    window.requestAnimationFrame(tick); // tick global
};

const validate = () => {
	let success = true;

	if (document.querySelector("#username").value != "joueur" ||
		document.querySelector("#password").value != "secret") {
		success = false;

		alert("Informations erronées.");
		document.querySelector("#username").value = "";
		document.querySelector("#password").value = "";
	}
	return success;
};
