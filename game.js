var Game = (function () {

	function Game() {
		this.deck = new Deck(true);
		this.player = new Player();
		var player

		this.play = function () {
			var cardDiv = document.getElementById("cardField");
			var play = document.getElementById("play");

			deck = new Deck(true);
			player = new Player();

			var cardImage = document.createElement("img");
			// cardImage1.src = "img/back.png";
			// cardImage2.src = "img/back.png";
			// cardImage3.src = "img/back.png";
			// cardImage4.src = "img/back.png";
			// cardImage5.src = "img/back.png";
			
			// cardDiv.appendChild(cardImage1);
			// cardDiv.appendChild(cardImage2);
			// cardDiv.appendChild(cardImage3);
			// cardDiv.appendChild(cardImage4);
			// cardDiv.appendChild(cardImage5);
			
		}



	}

	function hold() {


	}

	function deal() {
		deck.deal();
	}






	return Game;

})();