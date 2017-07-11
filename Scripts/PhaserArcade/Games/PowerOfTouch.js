// establish namespace
// var PA = {};
// PA.PhaserArcade = window.PhaserArcade || {};
// PA.Games = PhaserArcade.Games = PhaserArcade.Games || {};
// PA.States = Games.States = Games.States || {};
// PA.Cache = PhaserArcade.Games.Cache = PhaserArcade.Games.Cache || {};
// PA.Utility = PhaserArcade.Utility = PhaserArcade.Utility || {};

var CacheButtons = Cache._registered_game_buttons = Cache._registered_game_buttons || [];

Games.POT = function (game, configuration) {
    var gen0 = configuration.gen0;
    var gen0Bitmap = game.make.bitmapData(100, 100);

    var generators = [];

    var Generator = function (previousGeneration) {
        this.genDex = 0;
        this.rate = 0;

        if (Utility.typeCheck(previousGeneration, "number")) {
            this.rate = previousGeneration;
        }
        else if (Utility.typeCheck(previousGeneration, "object")) {

        }
    }

    var _timer = game.time.create();

    return {
        load: function (game) { },
        create: function (game) {
            var gen0Sprite = game.add.sprite(10, 10, gen0Bitmap);

            var _x = 0;
            var _y = 0;
            var tint = 0xFF0000;
            var color = Phaser.Color.hexToRGBArray(tint);

            _timer.loop(gen0, function () {
                gen0Bitmap.setPixel(_x % 100, _y % 100,  0xFF*color[0], 0xFF*color[1],  0xFF*color[2], true);
                _x += 1;
                _y += Number(_x % 100 == 0);

                if (_y == 100) {
                    _x = 0;
                    _y = 0;
                    tint = tint >> 1;
                }
            });
            _timer.start();
        },
        update: function (game) {


        },
        shutdown: function (game) {
            gen0Bitmap.destroy();
        }
    };
}

Games.POT.title = function (game) {
    var _totalTaps = 0;
    var _timer = null;


    Cache._active_play_config = { gen0: 200 };
    return {
        load: function (game) {

        },
        create: function (game) {
            game.input.onTap.add(function (item) {
                _totalTaps += 1;

                if (_timer === null) {
                    _timer = game.time.create();
                    _timer.add(2000, function () {
                        Cache._active_play_config = {
                            gen0: _totalTaps / 2
                        }

                        game.state.start('play');
                    });

                    _timer.start();
                }
            });
        },
        update: function (game) { }
    };
}

Games.POT.LauncherButton = function (game) {
    return Utility.makeButton(game, 0, 0, "Power of Touch", function () {
        Cache._active_play = PhaserArcade.Games.POT;
        game.state.start('title');
    });
}

CacheButtons.push(Games.POT.LauncherButton);

window.PhaserArcade = PhaserArcade;
