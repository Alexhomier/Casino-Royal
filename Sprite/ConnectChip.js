class Chip {
    constructor() {
		this.element = document.querySelector("#chip");
		this.id = "chip";
		this.left = Math.random() * 1200;
        this.speed = 2;
		this.velocity = 0.2; // Accélération/gravité

		this.tiledImage = new TiledImage("SpriteSheet/VOKR Chip Icon Set FREE Version by weirdsgn/VOKR Chip Icon Set FREE Version by weirdsgn/SPIN & FLIP/256/spin-h01-256.png", columnCount, rowCount, refreshDelay, loopCol, scale, "chip")
		this.tiledImage.changeRow(1); // starts at 0
		this.tiledImage.changeMinMaxInterval(0, 8);

		this.tiledImage.addImage("SpriteSheet/VOKR Chip Icon Set FREE Version by weirdsgn/VOKR Chip Icon Set FREE Version by weirdsgn/SPIN & FLIP/256/spin-v01-256.png");
		this.tiledImage.addImage("SpriteSheet/VOKR Chip Icon Set FREE Version by weirdsgn/VOKR Chip Icon Set FREE Version by weirdsgn/SPIN & FLIP/256/spin-v02-256.png");
		this.tiledImage.addImage("SpriteSheet/VOKR Chip Icon Set FREE Version by weirdsgn/VOKR Chip Icon Set FREE Version by weirdsgn/SPIN & FLIP/256/spin-v03-256.png");
		this.tiledImage.addImage("SpriteSheet/VOKR Chip Icon Set FREE Version by weirdsgn/VOKR Chip Icon Set FREE Version by weirdsgn/SPIN & FLIP/256/spin-v04-256.png");
		this.tiledImage.addImage("SpriteSheet/VOKR Chip Icon Set FREE Version by weirdsgn/VOKR Chip Icon Set FREE Version by weirdsgn/SPIN & FLIP/256/spin-v05-256.png");
		this.tiledImage.addImage("SpriteSheet/VOKR Chip Icon Set FREE Version by weirdsgn/VOKR Chip Icon Set FREE Version by weirdsgn/SPIN & FLIP/256/spin-v06-256.png");
		this.tiledImage.addImage("SpriteSheet/VOKR Chip Icon Set FREE Version by weirdsgn/VOKR Chip Icon Set FREE Version by weirdsgn/SPIN & FLIP/256/spin-v07-256.png");
		this.tiledImage.addImage("SpriteSheet/VOKR Chip Icon Set FREE Version by weirdsgn/VOKR Chip Icon Set FREE Version by weirdsgn/SPIN & FLIP/256/spin-v08-256.png");
	}

    tick() {
		let rotation = 0;

		rotation++;

		if(rotation > 8){
			rotation = 0;
		}

		this.tiledImage.changeRow(rotation);

        let top = this.element.offsetTop;
		top += this.speed;


        this.speed += this.velocity;

        if (top > 600) {
            top = 600;
            this.speed = -this.speed/1.5;

            if (Math.abs(this.speed) < 1) {
                this.speed = 0;
                this.velocity = 0;
            }
		}

        this.element.style.top = top + "px";

    }
}