var Deck = (function () {


    // capital Deck is a construcor function 
    // To determin if deck will be suffled or not.  
    function Deck(shuffleNow) {

        this.cards = [
            '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9S', '10D', 'JC', 'QH', 'KS', 'AH',
            '2S', '3H', '4S', '5S', '6S', '7S', '8S', '9H', '10S', 'JS', 'QS', 'KS', 'AS',
            '2C', '3C', '4H', '5C', '6C', '7C', '8H', '9C', '10C', 'JH', 'QC', 'KC', 'AC',
            '2D', '3D', '4D', '5D', '6H', '7D', '8D', '9D', '10H', 'JD', 'QD', 'KD', 'AD'
        
       
            // '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
            // '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
            // '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
            // '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'
        ];

        if (shuffleNow) {
            this.shuffle();
        }
    }
     


    // This is to suffle the cards in the deck 
    Deck.prototype.shuffle = function () {

        var m = this.cards.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = this.cards[m];
            this.cards[m] = this.cards[i];
            this.cards[i] = t;
        }
    };



    // returning cards back to deck
    Deck.prototype.deal = function (howMany) {
        // Default perameter -- if only need one card it will only deal not
        howMany = howMany || 1;

        // making an array of stings with new card names
        var newCards = this.cards.splice(0, howMany);

        //maps will return new array of card objects -- item is the name from the deck
        return newCards.map(function (item) {
            return new Card(item);
        });
    };


    return Deck;
})();