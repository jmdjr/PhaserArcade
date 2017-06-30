// establish namespace
var PhaserArcade = window.PhaserArcade || {};
var Games = PhaserArcade.Games = PhaserArcade.Games || {};
var States = Games.States = Games.States || {};
var Cache = PhaserArcade.Games.Cache = PhaserArcade.Games.Cache || {};
var Utility = PhaserArcade.Utility = PhaserArcade.Utility || {};

var CacheButtons = Cache._registered_game_buttons = Cache._registered_game_buttons || [];

Games.PlugGame = function (game, configuration) {
   return {
      load: function (game) { },
      create: function (game) { },
      update: function (game) { }
   };
}

Games.PlugGame.title = function (game) {
Cache._active_play_config = { };
   return {
      load: function (game) { },
      create: function (game) { },
      update: function (game) { }
   };
}

Games.PlugGame.LauncherButton = function(game) {
    return Utility.makeButton(game, 0, 0, "Plug Game", function() {
        Cache._active_play = PhaserArcade.Games.PlugGame;
        game.state.start('title');
    });
}

CacheButtons.push(Games.PlugGame.LauncherButton);

window.PhaserArcade = PhaserArcade;
