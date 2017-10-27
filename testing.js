var testing = (function () {
    //////////////////////////test hands by creating a ton of hands


    //////Royal Flush - 250:1 - including ace, king, queen, jack, and ten all in the same suit,
    ///which is the hand of the highest possible value when wild cards are not in use.

    var handRoyalFlush = new Hand([
        new Card('AH'),
        new Card('KH'),
        new Card('QH'),
        new Card('JH'),
        new Card('10H')
    ]);

    //////Straight Flush - 50:1 - five cards of sequential rank, all the same suit

    var handStraightFlush = new Hand([
        new Card('2H'),
        new Card('3H'),
        new Card('4H'),
        new Card('5H'),
        new Card('6H')
    ]);

    //////test 4 of a kind - 40:1 -is a poker hand containing four cards of the same rank and one card of another rank 

    var fourOfaKind = new Hand([
        new Card('2S'),
        new Card('2H'),
        new Card('2D'),
        new Card('2C'),
        new Card('6S')
    ]);

    //////Full House - 10:1 -  is a poker hand containing three cards of one rank and two cards of another rank, 

    var fullHouse = new Deck(true);

    var hand = new Hand([
        new Card('3H'),
        new Card('3S'),
        new Card('3C'),
        new Card('6H'),
        new Card('6C')
    ]);

    /////////- Flush - 7:1 - is a poker hand containing five cards all of the same suit, not all of sequential rank,

    var flush = new Deck(true);

    var hand = new Hand([
        new Card('2H'),
        new Card('5H'),
        new Card('9H'),
        new Card('JH'),
        new Card('AH')
    ]);
    /////////- Straight - 5:1 -  is a poker hand containing five cards of sequential rank, not all of the same suit, 

    var straight = new Deck(true);

    var hand = new Hand([
        new Card('2H'),
        new Card('3C'),
        new Card('4S'),
        new Card('5C'),
        new Card('6H')
    ]);

    /////////- 3 of a Kind - 3:1 -  is a poker hand containing three cards of the same rank and two cards of two other ranks 

    var threeOfaKind = new Deck(true);

    var hand = new Hand([
        new Card('2H'),
        new Card('2C'),
        new Card('2S'),
        new Card('5C'),
        new Card('6H')
    ]);

    /////////- 2 Pairs - 2:1 -is a poker hand containing two cards of the same rank, two cards of another rank and one card of a third rank 

    var twoOfKind = new Deck(true);

    var hand = new Hand([
        new Card('JH'),
        new Card('JC'),
        new Card('3S'),
        new Card('3C'),
        new Card('6H')
    ]);

    /////////- 1 Pair Jacks or Better - 1:1 - or simply a pair, is a poker hand containing two cards of the same rank and three cards of three other ranks

    var pair = new Deck(true);

    var hand = new Hand([
        new Card('JH'),
        new Card('JC'),
        new Card('2S'),
        new Card('7C'),
        new Card('6H')
    ]);



    //see if best hand works
    console.log(hand.getBestHand());

    return testing;
    //END IIFE - Don't code below this line
})();

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



// four cards all have same numerical value -- suits not important
function isFourOfAKind(cardGroups) {

    for (var key in cardGroups) {

        var value = cardGroups[key];

        if (value === 1 && value === 4) {
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
    return false;

}

function isThreeOfAKind(cardGroups) {

    var names = Object.getOwnPropertyNames(cardGroups);
    if (names.length === 3) {
        return names.some(function (name) {
            return cardGroups[name] === 3;
        })
    }
}

function isTwoPair(cardGroups) {

    var pairCount = 0;

    for (var key in cardGroups) {
        var value = cardGroups[key];
        if (value === 2) {
            pairCount++;
        }
    }
    if (pairCount === 2) {
        return true;
    }
    return false;
}

function isJacksOrBetter(cardGroups) {

    for (var key in cardGroups) {
        if (key > 10) {
            var value = cardGroups[key];
            if (value === 2) {
                return true;
            }
        }
        return false;
    }
}