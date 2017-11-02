

var Player = (function () {


	const LOCAL_STORAGE_KEY = "VideoPokerAccount";

	function Player(balance) {
		// changed 0 from 100
		this.account = balance || 0;

		if(this.account === 0) {
			this.account = loadFromLocalStorage();
		};
	};

	Player.prototype.updateAccount = function (amount) {
		this.account += amount;

		saveToLocalStorage(this.account);
	};

	function loadFromLocalStorage( ) {
		return parseInt(loacalStorage.getItem(LOCAL_STORAGE_KEY) || "0");
	};

	function saveToLocalStorage(account) {
		localStorage.setItem(LOCAL_STORAGE_KEY, account);
	};

	return Player;

})();