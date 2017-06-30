// establish namespace
var PhaserArcade = window.PhaserArcade || {};
var Games = PhaserArcade.Games = PhaserArcade.Games || {};
var States = Games.States = Games.States || {};
var Cache = PhaserArcade.Games.Cache = PhaserArcade.Games.Cache || {};
var Utility = PhaserArcade.Utility = PhaserArcade.Utility || {};

// Reference PhaserArcade.Games.Cache for active game function.

PhaserArcade.Games.States.Title = {
	_active_title: null,

	preload: function () {

		if (Cache._active_play != null && Cache._active_play.title != null) {
			this._active_title = Cache._active_play.title(game);

			if (this._active_title.load) {
				this._active_title.load(game);
			}
		}
		else {
			console.warn("No game selected or improper game structure. please see PlugGameTemplate.js for proper game and title object structure.");
			game.state.start("game_select");
		}
	},

	create: function () {
		if (this._active_title && this._active_title.create) {
			this._active_title.create(game);
		}

		var button = Utility.makeButton(game, 10, 10, 'Return to Game Select', function (button, mouse) {
			Cache._active_play_config = null;
			game.state.start('game_select');
		});
	},

	update: function () {
		if (this._active_title && this._active_title.update) {
			this._active_title.update(game);
		}
	},

	render: function () {
		if (this._active_title && this._active_title.render) {
			this._active_title.render(game);
		}
	},
	shutdown: function () {
		if (this._active_title && this._active_title.shutdown) {
			this._active_title.shutdown(game);
		}
	}
};

window.PhaserArcade = PhaserArcade;