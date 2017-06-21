// establish namespace
var PhaserArcade = window.PhaserArcade || {};
var Games = PhaserArcade.Games = PhaserArcade.Games || {};
var States = Games.States = Games.States || {};
var Cache = PhaserArcade.Games.Cache = PhaserArcade.Games.Cache || {};
var Utility = PhaserArcade.Utility = PhaserArcade.Utility || {};

//console.clear();

var game = PhaserArcade._game = new Phaser.Game('100%', '100%', Phaser.AUTO);

//adding Game States

game.state.add('boot', PhaserArcade.Games.States.Boot);
game.state.add('load', PhaserArcade.Games.States.Load);
game.state.add('game_select', PhaserArcade.Games.States.GameSelect);
game.state.add('title', PhaserArcade.Games.States.Title);
game.state.add('play', PhaserArcade.Games.States.Play);

game.state.start('boot');

window.PhaserArcade = PhaserArcade;