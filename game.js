var Game = (function () {

	function Game() {
		// ADD TRUE back inside deck!!!!!
		this.deck = new Deck();
		this.player = new Player(1000);
		this.hand = new Hand();
		this.newHand = true;
		this.cardImages = [];
		this.playerBet = 0;
	};

	Game.prototype.setUp = function () {

		var self = this;

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

		// Once a bet amount is inputed the Deal button becomes availabel
		document.getElementById("betAmount").addEventListener("click", function (event) {
            document.getElementById("deal").removeAttribute("disabled");
        });
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

			this.newHand = true;
			
			playAgainButton.classList.toggle("hidden");
			
		};

	};

	Game.prototype.hold = function (img) {
		img.classList.toggle("hold");
	};

	function showCardOnTable(img, card) {
		var self = this;
		img.src = "img/" + card.name + ".png";
		img.setAttribute("card-name", card.name);
	};

	var playAgainButton = document.getElementById("playAgain");	
	playAgainButton.addEventListener("click", playAgain);
	

	function playAgain() {
		winner.innerHTML = "";
		cardField.innerHTML = "";
		// Element.removeAttribute("hold");
		this.newHand;
			getElementByClass('cardField').removeAttribute('.hold');
			// document.getElementById("deal").addAttribute("disabled");
			// document.querySelectorAll("img:not(.hold)");
	}

	return new Game();

})().setUp();