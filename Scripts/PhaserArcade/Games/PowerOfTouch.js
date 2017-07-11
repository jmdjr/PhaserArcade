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
    var gen00Bitmap;
    var gen01Bitmap;
    var _genBitMap = [];
    var _genSpriteMap = [];

    var generations = [];
    var generators = [];

    var Generation = function(previousGeneration) {
        this.genDex = 0;
        this.hueDex = 0.0;
        this.genRate = 0.0;

        if (Utility.typeCheck(previousGeneration, "number")) {
            this.genRate = previousGeneration;
            this.count = 1;
        }
        else if (Utility.typeCheck(previousGeneration, "object")) {
            this.hueDex = previousGeneration.hu
        }

        this.Color = function() {
                var c = Phaser.Color.HSLtoRGB(hue, 1.0, 0.5);
                return {
                    rgbString:"rgb(" + c.r + ", " + c.g + ", " + c.b + ")"
                };
        }
    };

    var Generator = function () {
        this.rate = 0;
        this.count = 0;
    }

    var _timer = game.time.create();

    return {
        load: function (game) { },
        create: function (game) {
            _cycleSize = 100;
            _cycleLength = 10;

            for(var i = 0; i < 10; i += 1) {
                _genBitMap.push(game.make.bitmapData(_cycleSize, _cycleSize));
            }

            _genBitMap.forEach(function(map) {
                map.rect(0, 0, _cycleSize, _cycleSize, "#FFFFFF");
                map.dirty = true;
            });

            for(var i = 0; i < 10; i += 1) {
                _genSpriteMap.push(game.add.sprite((i * 110) + 10, 10, _genBitMap[i]));
            }

            var _x = 0;
            var _y = 0;
            var hue = 0.00;
            var _sizeUp = 10.0;
            
            var _timerCycleSize = _cycleSize /_sizeUp;
            var mapIndex = 0;

            var _tickTimer = _timer.loop(gen0, function () {
                var x = (_x % _timerCycleSize) * _sizeUp;
                var y = (_y % _timerCycleSize) * _sizeUp;
                var c = Phaser.Color.HSLtoRGB(hue, 1.0, 0.5);
                var color = "rgb(" + c.r + ", " + c.g + ", " + c.b + ")";

                _genBitMap[mapIndex].rect(x, y, _sizeUp, _sizeUp, color);
                _genBitMap[mapIndex].dirty = true;

                _x += 1;
                _y += Number(_x % _timerCycleSize == 0);

                if (_y == _timerCycleSize) {
                    _x = 0;
                    _y = 0;
                    hue += 0.1;
                    hue = hue > 1.0 ? 0.0 : hue;

                    _tickTimer.delay = mapIndex == 0 ? _tickTimer.delay : _tickTimer.delay * 100;
                    mapIndex += 1;
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
                            gen0: (2 / _totalTaps) * 1000
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
