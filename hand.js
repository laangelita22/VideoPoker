var Hand = (function () {


    function Hand(cards) {
        this.cards = cards || [];
    };

    Hand.prototype.addCards = function (cardsToAdd) {
        this.cards = this.cards.concat(cardsToAdd);
    };


    Hand.prototype.deleteCards = function (names) {
        this.cards = this.cards.filter(function (item) {
            return !names.includes(item.name);
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
        // else if (isStraightFlush(cardGroups)) {
        //     return {
        //         name: "Straight Flush",
        //         multiplier: 50,
        //     }
        // }
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
        // else if (isFlush(this.cards)) {
        //     return {
        //         name: "Flush",
        //         multiplier: 7,
        //     }
        // }
        else if (isStraight(this.cards)) {
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
                name: "G-A-M-E O-V-E-R!",
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
        return groups;
    };



    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Each Hand's Function~~~~
    //////Royal Flush - 250:1 - including ace, king, queen, jack, and ten all in the same suit,
    function isRoyalFlush(cardGroups, cards) {

        // If the position of cardValue 10 is at position 0 
        var positionZero = 0;

        // run isFlush function
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
        };
    };


    //////Straight Flush - 50:1 - five cards of sequential rank, all the same suit
    function isStraightFlush(cardGroups, cards) {



        // run isFlush function

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

        var names = Object.getOwnPropertyNames(cardGroups);
        if (names.length === 2) {
            return names.some(function (name) {
                return cardGroups[name] === 4;
            });
        };
    };


    // Three of one kind -- two of another -- suits not important
    function isFullHouse(cardGroups) {

        var names = Object.getOwnPropertyNames(cardGroups);
        if (names.length === 2) {
            return names.some(function (name) {
                return cardGroups[name] === 3;
            });
        };
    };


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
        return false;

    }

    function isStraight(cardGroups) {

        // var counter = 0;
        // firstCard = 0;

        // for (var key in cardGroups) {
        //     // debugger
        //     if(cards.length === 5){
        //         if (i=0) {
        //             firstCard = key;
        //         }
        //         if(i=1) {
        //             firstCard + 1 === key;
        //         }
        //         if(i=2) {
        //             firstCard + 2 === key;
        //         }
        //         if(i=3) {
        //             firstCard + 3 === key;
        //         }
        //         if(i+4) {
        //             fistCard + 4 === key;
        //         }
        //     }



        // for (var i = 0; i < 5; i++) {
        //     if (firstCard + i === i + 1) {
        //         return true
        //     }
        //     continue
        // }
        // return false
        // }

    }


    function isThreeOfAKind(cardGroups) {

        var names = Object.getOwnPropertyNames(cardGroups);
        if (names.length === 3) {
            return names.some(function (name) {
                return cardGroups[name] === 3;
            });
        };
    };


    function isTwoPair(cardGroups) {

        var names = Object.getOwnPropertyNames(cardGroups);
        if (names.length === 3) {
            return names.some(function (name) {
                return cardGroups[name] === 2;
            });
        };



        // var initialCard = 0;

        // for (var key in cardGroups) {
        //     var value = cardGroups[key];
        //     if (value === 2) {
        //         pairCount++;
        //     }
        // }
        // if (pairCount === 2) {

        //     return true; 
        // }
        // return false;
    };



    function isJacksOrBetter(cardGroups) {

        var names = Object.getOwnPropertyNames(cardGroups);
        if (names.length === 4) {
            return names.some(function (name) {
                if (name > 10) {
                    if (cardGroups[name] === 2) {
                        return true;
                    }
                }
            });
        };
    };



    return Hand;
})();