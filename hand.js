var Hand = (function () {

    var groupLength = 0;

    function Hand(cards) {
        this.cards = cards || [];
    };

    Hand.prototype.addCards = function (cardsToAdd) {
        this.cards = this.cards.concat(cardsToAdd);
    };


    Hand.prototype.deleteCards = function (cardsToDelete) {
        this.cards = this.cards.filter(function (item) {
            return !cardsToDelete.includes(item.name);
        });

    };

    Hand.prototype.getBestHand = function () {

        var cardGroups = getGroups(this.cards);

        if (isRoyalFlush(cardGroups, this.cards)) {
            return {
                name: "Royal Flush!",
                multiplier: 250,
            }
        }
        else if (isStraightFlush(cardGroups)) {
            return {
                name: "Straight Flush",
                multiplier: 50,
            }
        }
        else if (isFourOfAKind(cardGroups)) {
            return {
                name: "Four Of A Kind",
                multiplier: 40,
            }
        }
        else if (isFullHouse(cardGroups)) {
            return {
                name: "Full House",
                multiplier: 10,
            }
        }
        else if (isFlush(this.cards)) {
            return {
                name: "Flush",
                multiplier: 7,
            }
        }
        else if (isStraight(cardGroups)) {
            return {
                name: "Straight",
                multiplier: 5,
            }
        }
        else if (isThreeOfAKind(cardGroups)) {
            return {
                name: "Three Of A Kind",
                multiplier: 3,
            }
        } else if (isTwoPair(cardGroups)) {
            return {
                name: "Is Two Pair",
                multiplier: 2,
            }
        }
        else if (isJacksOrBetter(cardGroups)) {
            return {
                name: "Jacks OR Better",
                multiplier: 1,
            }
        }
        else {
            return {
                name: "N-O-T W-I-N-N-I-N-G H-A-N-D!",
                multiplier: 0
            }
        }
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

        groupLength = Object.getOwnPropertyNames(groups).length;

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
            };
        };

    };


    //////Straight Flush - 50:1 - five cards of sequential rank, all the same suit
    function isStraightFlush(cards, cardGroups) {

        if (isFlush && isStraight === true) {
            return true;
        } else {
            return false;
        };
    };


    // four cards all have same numerical value -- suits not important
    function isFourOfAKind(cardGroups) {

        var names = Object.getOwnPropertyNames(cardGroups);
        if (groupLength === 2) {
            return names.some(function (name) {
                return cardGroups[name] === 4;
            });
        };
    };


    // Three of one kind -- two of another -- suits not important
    function isFullHouse(cardGroups) {

        var names = Object.getOwnPropertyNames(cardGroups);
        if (groupLength === 2) {
            return names.some(function (name) {
                return cardGroups[name] === 3;
            });
        };
    };


    // Checking to see if all suits are the same
    function isFlush(cards) {

        if (groupLength === 5 &&
            cards[0].suit === cards[1].suit &&
            cards[0].suit === cards[2].suit &&
            cards[0].suit === cards[3].suit &&
            cards[0].suit === cards[4].suit) {

            //  if broken fix here !!
            return true;
        };

        return false;

    };


    function isStraight(cardGroups) {

        var names = Object.getOwnPropertyNames(cardGroups);
        if (names[4] - names[0] === 4) {
            return true;
        };

        if (names[0] == 2) {
            if (names[3] - names[0] === 3) {
                if (names[4] == 14) {
                    return true;
                };;
            };
            return false;
        };
    };


    function isThreeOfAKind(cardGroups) {

        var names = Object.getOwnPropertyNames(cardGroups);
        if (groupLength === 3) {
            return names.some(function (name) {
                return cardGroups[name] === 3;
            });
        };
    };


    function isTwoPair(cardGroups) {

        var names = Object.getOwnPropertyNames(cardGroups);
        if (groupLength === 3) {
            return names.some(function (name) {
                return cardGroups[name] === 2;
            });
        };
    };


    function isJacksOrBetter(cardGroups) {

        var names = Object.getOwnPropertyNames(cardGroups);
        if (groupLength === 4) {
            return names.some(function (name) {
                if (name > 10) {
                    if (cardGroups[name] === 2) {
                        return true;
                    };
                };
            });
        };
    };



    return Hand;
})();