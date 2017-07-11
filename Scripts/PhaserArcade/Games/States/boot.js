// establish namespace
var PhaserArcade = window.PhaserArcade || {};
var Games = PhaserArcade.Games = PhaserArcade.Games || {};
var States = Games.States = Games.States || {};
var Cache = PhaserArcade.Games.Cache = PhaserArcade.Games.Cache || {};
var Utility = PhaserArcade.Utility = PhaserArcade.Utility || {};


PhaserArcade.Games.States.Boot = {
	create: function () {
		Utility._Debug = true;
		Utility._AutoGameIndex = 1;
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.input.addPointer();
		game.input.addPointer();
		game.input.addPointer();
		game.input.addPointer();
		game.state.start('load');
	}
};

window.PhaserArcade = PhaserArcade;