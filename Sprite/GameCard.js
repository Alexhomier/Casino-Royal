class Card {
	constructor(id, symbole, num, maxTop, maxLeft, who, firstDealerCard){
		this.symbole = symbole;
		this.num = num;
		this.firstDealerCard = firstDealerCard;
		this.maxTop = maxTop;
		this.maxLeft = maxLeft;
		this.top = 100;
		this.left = 1100;
		this.speedTop = 0;
		this.speedLeft = 0;
		this.who = who;
		this.animationEndTop = false;
		this.animationEndLeft = false;
		this.pathImg = "SpriteSheet/PlayingCard/cartes/";

		this.element = document.createElement("img");
		this.element.id = id;

		this.element.style.zIndex = "20";
		this.element.style.position = "absolute";
		this.element.style.width = 76 + "px";
		this.element.style.height = 106 + "px";
		this.element.style.top = 100 + "px";
		this.element.style.left = 1100 + "px";

		this.resolution();
		this.wichCard();
		this.setSpeed();
		document.body.appendChild(this.element);
	}

	resolution() {
		if(screen.width == 1920 && screen.height == 1080){
			this.top = 100;
			this.left = 1500;
			this.element.style.top = 100 + "px";
			this.element.style.left = 1500 + "px";

		}
	}

	wichCard() {
		if(this.firstDealerCard == true){
			this.element.src = this.pathImg + "tile.png";
		}
		else{
			this.element.src = this.pathImg + this.num + this.symbole + ".png";
		}
	}

	setSpeed() {
		if(this.who == "dealer"){
			this.speedTop = 2;
			this.speedLeft = 13;
		}else{
			if(screen.width == 1920 && screen.height == 1080){
				this.speedTop = 7;
				this.speedLeft = 8;
			}else{
				this.speedTop = 5;
				this.speedLeft = 8;
			}
		}
	}

	stand() {
		this.element.src = this.pathImg + this.num + this.symbole + ".png";
	}

	tick() {
		let top = this.top;
		let left = this.left;
		let maxTop = this.maxTop;
		let maxLeft = this.maxLeft;

		if(this.who == "dealer"){
			if(top > maxTop){
				top -= this.speedTop;
				this.top = top;
			}else
				top = maxTop;

			if(left > maxLeft){
				left -= this.speedLeft;
				this.left = left;
			}
			else
				left = maxLeft;
		}else
			if(this.who == "player"){
				if(top < maxTop){
					top += this.speedTop;
					this.top = top;
				}else
					top = maxTop

				if(left > maxLeft){
					left -= this.speedLeft;
					this.left = left;
				}
				else
					left = maxLeft;
			}
		this.element.style.top = top + "px";
		this.element.style.left = left + "px";
	}
}