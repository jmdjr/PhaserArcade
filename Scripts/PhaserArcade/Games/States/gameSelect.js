// establish namespace
var PhaserArcade = window.PhaserArcade || {};
var Games = PhaserArcade.Games = PhaserArcade.Games || {};
var States = Games.States = Games.States || {};
var Cache = PhaserArcade.Games.Cache = PhaserArcade.Games.Cache || {};
var Utility = PhaserArcade.Utility = PhaserArcade.Utility || {};

var CacheButtons = Cache._registered_game_buttons = Cache._registered_game_buttons || [];

States.GameSelect = {
	loadingIcon: null,

	preload: function () {
		game.stage.backgroundColor = '#AAAAFF';
		this.loadingIcon = game.add.text(game.world.centerX, game.world.centerY, 'loading...', { fill: '#FFFFFF' });
		this.loadingIcon.anchor.setTo(0.5, 0.5);

		Cache._active_play = null;
		Cache._active_title = null;
        
	},

	create: function () {

		var Center = {
			x: game.world.width / 2,
			y: game.world.height / 2
		};

        for(var i = 0; CacheButtons && i < CacheButtons.length; i+=1) {
            var button = CacheButtons[i](game);

            button.x = Center.x - (button.width + 10);
            button.y = Center.y + button.height / 2;
		}
		
		this.loadingIcon.kill();

		if (Utility._Debug) {
			Cache._active_play = PhaserArcade.Games[Utility._DebugableGames[Utility._AutoGameIndex]];
        	game.state.start('title');
		}
	}
};

window.PhaserArcade = PhaserArcade;