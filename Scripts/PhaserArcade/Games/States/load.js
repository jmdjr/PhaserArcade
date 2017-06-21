// establish namespace
var PhaserArcade = window.PhaserArcade || {};
PhaserArcade.Games = PhaserArcade.Games || {};
PhaserArcade.Games.States = PhaserArcade.Games.States || {};

// Open cache namespace for caching loaded game logic.
PhaserArcade.Games.Cache = PhaserArcade.Games.Cache || {};

PhaserArcade.Games.States.Load = {

   preload: function () {
      var loadinglabel = game.add.text(game.world.centerX, game.world.centerY, 'loading...', { fill: '#101010' });
      loadinglabel.anchor.setTo(0.5, 0.5);
      game.load.spritesheet('ui-button', 'Content/button-horizontal.png', 96, 64);

	  game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
      game.scale.PageAlignHorizontally = true;
      game.scale.PageAlignVertically = true;
      game.stage.backgroundColor = '#F9F9F9';
   },

   create: function () {
      game.state.start('game_select');
   }
};

window.PhaserArcade = PhaserArcade;