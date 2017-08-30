PhaserArcade.Games.States.Boot = {
	create: function () {
		Utility._Debug = true;
		Utility._AutoGameIndex = 1;
            game.stage.disableVisibilityChange = true;
		game.time.advancedTiming = true;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.input.addPointer();
		game.input.addPointer();
		game.input.addPointer();
		game.input.addPointer();
		game.input.addPointer();
		game.input.addPointer();
		game.state.start('load');
	}
};

window.PhaserArcade = PhaserArcade;