var Game = (function () {

	var playAgainButton = document.getElementById("playAgain");
	var dealButton = document.getElementById("deal");


	function Game() {
		// ADD TRUE back inside deck!!! When done HARDCODEING Hands
		this.deck = new Deck();
		this.player = new Player(1000);
		this.hand = new Hand();
		this.newHand = true;
		this.cardImages = [];
		this.playerBet = 0;
	};

	Game.prototype.setUp = function () {

		var self = this;

		this.cardImages[0] = document.getElementById("cardImage1");
		this.cardImages[1] = document.getElementById("cardImage2");
		this.cardImages[2] = document.getElementById("cardImage3");
		this.cardImages[3] = document.getElementById("cardImage4");
		this.cardImages[4] = document.getElementById("cardImage5");

		// this is setting up the cards for when they are clicked and you hold the ones you want to keep
		this.cardImages[0].addEventListener("click", function (event) {
			self.hold(event.target)
		});
		this.cardImages[1].addEventListener("click", function (event) {
			self.hold(event.target)
		});
		this.cardImages[2].addEventListener("click", function (event) {
			self.hold(event.target)
		});
		this.cardImages[3].addEventListener("click", function (event) {
			self.hold(event.target)
		});
		this.cardImages[4].addEventListener("click", function (event) {
			self.hold(event.target)
		});

		// refering to button created below. 
		dealButton.addEventListener("click", function () {
			self.deal();
		});

		// Once a bet amount is inputed the Deal button becomes availabel
		document.getElementById("betAmount").addEventListener("click", function (event) {
			document.getElementById("deal").removeAttribute("disabled");
		});

		// Defining the PlayAgainButton so that it can the the this.instance 
		playAgainButton.addEventListener("click", function () {
			self.deck = new Deck(true);
			console.log(self.deck)
			playAgain();
		});
	};

	Game.prototype.deal = function () {

		this.playerBet = document.getElementById("betAmount").valueAsNumber;
		let playerBank = document.getElementById("bank");
		let showHandName = document.getElementById("winner");

		var self = this;

		if (this.newHand) {

			// removing the amount player bet && updating the bank display
			this.player.updateAccount(-this.playerBet);

			playerBank.innerHTML = this.player.account;

			// dealing out the 5 cards and showing card image
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

			// looping threw and removing/replacing cards wiht the hold class
			for (var i = 0; i < removeCards.length; i++) {
				removeCardNames.push(removeCards[i].getAttribute("card-name"));
				showCardOnTable(removeCards[i], newCards[i]);
			};

			this.hand.deleteCards(removeCardNames.join(","));

			this.hand.addCards(newCards);

			// Dependent on BestHand, how the credits are added up
			var bestHand = this.hand.getBestHand();

			if (bestHand.multiplier > 0) {
				
				var winnings = this.playerBet * bestHand.multiplier + this.playerBet;

				this.player.updateAccount(winnings);

			};

			// Updating the Bank amount as well as displaying which BestHand you got
			bank.innerHTML = this.player.account;
			winner.innerHTML = bestHand.name;

			this.newHand = true;

			// Showing PlayAgain Button && removing DealButton
			playAgainButton.classList.toggle("hidden");
			dealButton.classList.toggle("hidden");

		};
	};

	Game.prototype.hold = function (img) {
		img.classList.toggle("hold");
	};


	// Function shows the cards face up on the table
	function showCardOnTable(img, card) {
		var self = this;
		img.src = "img/" + card.name + ".png";
		img.setAttribute("card-name", card.name);
	};


	function playAgain() {

		// removes the PlayAgainButton && shows the DealButton
		playAgainButton.classList.toggle("hidden");
		dealButton.classList.toggle("hidden");

		// removes the previous winner display board
		winner.innerHTML = "";
		sideNote.innerHTML = "Feeling extra Lucky? Let us bet some more!";


		// giving a value to all things within the Class Name of "cards"
		var cardFace = document.getElementsByClassName('cards');

		// looping threw all the just named Value to remove all the ones that have 
		for (var i = 0; i < cardFace.length; i++) {
			cardFace[i].classList.remove("hold");
		};

		// Changes the card image to BACK until the new game starts when you press Deal!!
		for (var i = 0; i < cardFace.length; i++) {
			cardFace[i].src = "img/back.png";
		};
	};

	return new Game();

})().setUp();