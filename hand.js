var Hand = (function () {


    function Hand(cards) {
        this.cards = cards || [];
    }

    Hand.prototype.addCards = function (cardsToAdd) {
        this.cards = this.cards.concat(cardsToAdd);
    };


    Hand.prototype.removeCards = function (names) {
        this.cards = this.cards.filter(function (item) {
            return !names.includes(item.name);
        });

    };

    Hand.prototype.getBestHand = function () {

        var cardGroups = getGroups(this.cards);

        ///// Royal Flush - 250:1 - including ace, king, queen, jack, and ten all in the same suit,
        if (isRoyalFlush(cardGroups, this.cards)) {
            winner.innerHTML = "RoyalFlush! Way to go";
        }

        ///// Straight Flush - 50:1 - five cards of sequential rank, all the same suit
        else if (isStraightFlush(this.cards)) {
            winner.innerHTML = "Straight Flush! Almost there.";
        }

        ///// test 4 of a kind - 40:1 -is a poker hand containing four cards of the same rank and one card of another rank 
        else if (isFourOfAKind(cardGroups)) {
            winner.innerHTML = "Four of a Kind!";
        }

        ///// Flush - 7:1 - is a poker hand containing five cards all of the same suit, not all of sequential rank,
        else if (isFlush(this.cards)) {
            winner.innerHTML = "Flush! Getting a little better.";
        }

        ///// Straight - 5:1 -  is a poker hand containing five cards of sequential rank, not all of the same suit, 
        else if (isStraight(this.cards)) {
            winner.innerHTML = "Straight! Getting better.";
        }

        ///// 3 of a Kind - 3:1 -  is a poker hand containing three cards of the same rank and two cards of two other ranks 
        else if (isThreeOfAKind(cardGroups)) {
            winner.innerHTML = "Three of a Kind! okay-okay!?!";
        }

        ///// 2 Pairs - 2:1 -is a poker hand containing two cards of the same rank, two cards of another rank and one card of a third rank 
        else if (isTwoPair(cardGroups)) {
            winner.innerHTML = "Two Pairs. ";
        }
        ///// 1 Pair Jacks or Better - 1:1 - or simply a pair, is a poker hand containing two cards of the same rank and three cards of three other ranks
        else if (isJacksOrBetter(cardGroups)) {
            winner.innerHTML = "Jacks-Or-Better, just enough";
        }
        else {
            winner.innerHTML = "G-A-M-E  O-V-E-R!";
        }


        return cardGroups;
    };


    // ----------------------------------- FUNCTIONS THAT WILL DETERMINE HOW MANY OF EACH CARD VALUE -------
    function getGroups(cards) {

        var groups = {};
        var propertyName = "";

        cards.forEach(function (card) {

            propertyName = card.value;

            if (groups[propertyName]) {
                groups[propertyName]++;
            }
            else {
                groups[propertyName] = 1;
            }
        });
        return groups;
    };



    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Each Hand's Function~~~~
    //////Royal Flush - 250:1 - including ace, king, queen, jack, and ten all in the same suit,
    function isRoyalFlush(cardGroups, cards) {

        // If the position of cardValue 10 is at position 0 
        var positionZero = 0;

        var isFlush = cards.length === 5 &&
            cards[0].suit === cards[1].suit &&
            cards[0].suit === cards[2].suit &&
            cards[0].suit === cards[3].suit &&
            cards[0].suit === cards[4].suit;

        // do the function cards AKQJ10 == if the first card in the group starts with 10
        for (var key in cardGroups) {

            // two == because string to integer
            var isTen = key == 10;

            // making sure all requisites are passed
            if (isTen && isFlush && positionZero === 0) {
                return true;
            }
            else {
                return false;
            }
        }
    }


    //////Straight Flush - 50:1 - five cards of sequential rank, all the same suit
    function isStraightFlush(cardGroups, cards) {



        // var isFlush = cards.length === 5 &&
        //     cards[0].suit === cards[1].suit &&
        //     cards[0].suit === cards[2].suit &&
        //     cards[0].suit === cards[3].suit &&
        //     cards[0].suit === cards[4].suit;

        // for(var key in cardGroups) {

        //     // two == because string to integer
        //     var isTen = key == 10;

        //     // making sure all requisites are passed
        //     if (isConsecutive && isFlush && positionZero === 0) {
        //         return true;
        //     }
        //     else {
        //         return false;
        //     }
        // }
    }


    // four cards all have same numerical value -- suits not important
    function isFourOfAKind(cardGroups) {

        for (var key in cardGroups) {

            var value = cardGroups[key];

            if (value === 1 || value === 4) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    // Three of one kind -- two of another -- suits not important
    function isFullHouse(cardGroups) {

        for (var key in cardGroups) {

            var value = cardGroups[key];

            if (value === 2 && value === 3 || value === 3 && value === 2) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    // Checking to see if all suits are the same
    function isFlush(cards) {

        var isFlush = cards.length === 5 &&
            cards[0].suit === cards[1].suit &&
            cards[0].suit === cards[2].suit &&
            cards[0].suit === cards[3].suit &&
            cards[0].suit === cards[4].suit;

        if (isFlush) {
            return true;
        }
        else {
            return false;
        }
    }

    function isStraight(cards) {


    }

    function isThreeOfAKind(cardGroups) {

        for (var key in cardGroups) {

            var value = cardGroups[key];

            if (value === 3) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    function isTwoPair(cardGroups) {


    }

    function isJacksOrBetter(cards) {
        // 11 +

    }



    return Hand;
})();