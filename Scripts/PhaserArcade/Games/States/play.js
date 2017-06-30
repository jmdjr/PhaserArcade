// establish namespace
var PhaserArcade = window.PhaserArcade || {};
PhaserArcade.Games = PhaserArcade.Games || {};
PhaserArcade.Games.States = PhaserArcade.Games.States || {};
var Cache = PhaserArcade.Games.Cache = PhaserArcade.Games.Cache || {};

// Reference PhaserArcade.Games.Cache for active game function.

PhaserArcade.Games.States.Play = {
   _active_play: null,

   preload: function () {
      if (Cache._active_play != null && Cache._active_play_config != null) {
         this._active_play = Cache._active_play(game, Cache._active_play_config);
         this._active_play.load(game);
      }
   },

   create: function () {
      if (this._active_play && this._active_play.create) {
         this._active_play.create(game);
      }
   },

   update: function () {
      if (this._active_play && this._active_play.update) {
         this._active_play.update(game);
      }
   },

	render: function () {
		if (this._active_play && this._active_play.render) {
			this._active_play.render(game);
		}
	},
	shutdown: function () {
		if (this._active_play && this._active_play.shutdown) {
			this._active_play.shutdown(game);
		}
	}
};

window.PhaserArcade = PhaserArcade;