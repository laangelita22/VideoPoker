var Game = (function () {

	function Game() {
		this.deck = new Deck(true);
		this.player = new Player(1000);
		this.hand = new Hand();
		this.newHand = true;
		this.cardImages = [];
		this.playerBet = 0;

		// this.play = function () {
		// 	var cardDiv = document.getElementById("cardField");
		// 	var play = document.getElementById("play");

		// 	deck = new Deck(true);
		// 	player = new Player();
		// }
	}

	Game.prototype.play = function () {
		var self = this;

		// code in index.html will likely be attached here
		var dealButton = document.getElementById("deal");

		this.cardImages[0] = document.getElementById("cardImage1");
		this.cardImages[1] = document.getElementById("cardImage2");
		this.cardImages[2] = document.getElementById("cardImage3");
		this.cardImages[3] = document.getElementById("cardImage4");
		this.cardImages[4] = document.getElementById("cardImage5");

		// this is setting up the cards for when they are clicked and you hold the ones you want to keep
		this.cardImages[0].addEventListener("click", function (event) {
			self.hold(event.target)
		})
		this.cardImages[1].addEventListener("click", function (event) {
			self.hold(event.target)
		})
		this.cardImages[2].addEventListener("click", function (event) {
			self.hold(event.target)
		})
		this.cardImages[3].addEventListener("click", function (event) {
			self.hold(event.target)
		})
		this.cardImages[4].addEventListener("click", function (event) {
			self.hold(event.target)
		})

		// refering to button created below. 
		dealButton.addEventListener("click", function () {
			self.deal();
		})
	}

	Game.prototype.deal = function () {

		this.playerBet = document.getElementById("betAmount").valueAsNumber;
		let playerBank = document.getElementById("bank");
		let showHandName = document.getElementById("winner");

		var self = this;

		if (this.newHand) {

			this.player.updateAccount(-this.playerBet);

			playerBank.innerHTML = this.player.account;

			var cards = this.deck.deal(5);

			showCardOnTable(this.cardImages[0], cards[0]);
			showCardOnTable(this.cardImages[1], cards[1]);
			showCardOnTable(this.cardImages[2], cards[2]);
			showCardOnTable(this.cardImages[3], cards[3]);
			showCardOnTable(this.cardImages[4], cards[4]);

			this.hand = new Hand(cards);
			this.newHand = false;
		}
		else {
			var removeCards = document.querySelectorAll("img:not(.hold)")
			var newCards = this.deck.deal(removeCards.length);
			var removeCardNames = [];

			for (var i = 0; i < removeCards.length; i++) {
				removeCardNames.push(removeCards[i].getAttribute("card-name"));
				showCardOnTable(removeCards[i], newCards[i]);
			}

			this.hand.deleteCards(removeCardNames.join(","));

			this.hand.addCards(newCards);

			var bestHand = this.hand.getBestHand();
			var winnings = this.playerBet * bestHand.multiplier + this.playerBet;

			this.player.updateAccount(winnings);
			bank.innerHTML = this.player.account;
			winner.innerHTML = bestHand.name;

			if (this.newHand = true) {
			document.getElementById("deal").addAttribute("disabled");
			}
		}

	};

	Game.prototype.hold = function (img) {
		img.classList.toggle("hold");
	};

	function showCardOnTable(img, card) {
		var self = this;
		img.src = "img/" + card.name + ".png";
		img.setAttribute("card-name", card.name);
	};


	return new Game();

})().play();