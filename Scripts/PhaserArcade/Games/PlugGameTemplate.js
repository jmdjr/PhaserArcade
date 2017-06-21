// establish namespace
var PhaserArcade = window.PhaserArcade || {};
var Games = PhaserArcade.Games = PhaserArcade.Games || {};
var States = Games.States = Games.States || {};
var Cache = PhaserArcade.Games.Cache = PhaserArcade.Games.Cache || {};
var Utility = PhaserArcade.Utility = PhaserArcade.Utility || {};


PhaserArcade.Games.PlugGame = function (game, configuration) {
   return {
      load: function (game) { },
      create: function (game) { },
      update: function (game) { }
   };
}

PhaserArcade.Games.PlugGame.title = function (game) {
Cache._active_play_config = { };
   return {
      load: function (game) { },
      create: function (game) { },
      update: function (game) { }
   };
}

window.PhaserArcade = PhaserArcade;
