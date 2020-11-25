class Chip {
	constructor(id){
		this.betContainer = document.getElementById("bet-container");
		this.resetBet = document.getElementById("table-bet-reset");
		this.clone;
		this.backgroundColor;
		this.id = getId();

		this.clone = this.wichId();
		this.betContainer.appendChild(this.clone);
		this.clone.id = id;

		this.backgroundColor = this.clone.style.backgroundColor;
		this.clone.style.cursor = "default";
		this.clone.style.position = "absolute";
		this.clone.style.top = Math.random() * 65 + "%";
		this.clone.style.left = Math.random() * 75 + "%";
	}

	wichId() {
		// Je fais un switch parce que je peux pas mettre de variable dans le ID
		switch(this.id) {
			case "table-bet-1":
				this.clone = document.getElementById("table-bet-1").cloneNode(false)
				this.clone.innerHTML = "1$";
				break;
			case "table-bet-5":
				this.clone = document.getElementById("table-bet-5").cloneNode(false);
				this.clone.innerHTML = "5$";
				break;
			case "table-bet-100":
				this.clone = document.getElementById("table-bet-100").cloneNode(false);
				this.clone.innerHTML = "100$";
				break;
			case "table-bet-500":
				this.clone = document.getElementById("table-bet-500").cloneNode(false);
				this.clone.innerHTML = "500$";
				break;
			default:
		}
		return this.clone;
	}
}
