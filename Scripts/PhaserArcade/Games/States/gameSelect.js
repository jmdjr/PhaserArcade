// establish namespace
var PhaserArcade = window.PhaserArcade || {};
var Games = PhaserArcade.Games = PhaserArcade.Games || {};
var States = Games.States = Games.States || {};
var Cache = PhaserArcade.Games.Cache = PhaserArcade.Games.Cache || {};
var Utility = PhaserArcade.Utility = PhaserArcade.Utility || {};


PhaserArcade.Games.States.GameSelect = {
	loadingIcon: null,

	preload: function () {
		game.stage.backgroundColor = '#AAAAFF';
		this.loadingIcon = game.add.text(game.world.centerX, game.world.centerY, 'loading...', { fill: '#FFFFFF' });
		this.loadingIcon.anchor.setTo(0.5, 0.5);

		Cache._active_play = null;
		Cache._active_title = null;
	},

	create: function () {
		//Cache._active_play = PhaserArcade.Games.PlugGame;
		//game.state.start('title');

		var Center = {
			x: game.world.width / 2,
			y: game.world.height / 2
		};

		var button = Utility.makeButton(game, 0, 0, 'Generic Game 1', function (button, mouse) {
			Cache._active_play = PhaserArcade.Games.PlugGame;
			game.state.start('title');
		});

		this.loadingIcon.destroy(true);

		button.x = Center.x - (button.width + 10);
		button.y = Center.y + button.height / 2;

		var button = Utility.makeButton(game, 0, 0, 'Generic Game 2', function (button, mouse) {
			Cache._active_play = PhaserArcade.Games.PlugGame;
			game.state.start('title');
		});

		button.x = Center.x + 10;
		button.y = Center.y + button.height / 2;
	}
};

window.PhaserArcade = PhaserArcade;