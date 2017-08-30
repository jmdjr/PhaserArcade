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
    var gen0Delay = 1 / gen0;
    var _cycleSize = 50;
    var _cycleLength = 10;
    var _cycleHeigth = 10;
    var _cyclePadding = _cycleLength / 2;

    var generations = [];
    var generators = [];

    var GenerationMap = function () {
        this._genBitMap = [];
        this._genSpriteMap = [];

        var _GenGroup = game.add.group();

        for (var i = 0; i < _cycleHeigth; i += 1) {
            var row = [];
            _genBitMap.push(row);

            for (var j = 0; j < _cycleLength; j += 1) {
                row.push(game.make.bitmapData(_cycleSize, _cycleSize));
            }
        }

        _genBitMap.forEach(function (collection) {
            collection.forEach(function (map) {
                map.rect(0, 0, _cycleSize, _cycleSize, "#FFFFFF");
                map.dirty = true;
            });
        });

        for (var i = 0; i < _cycleHeigth; i += 1) {
            var row = [];
            _genSpriteMap.push(row);

            for (var j = 0; j < _cycleLength; j += 1) {
                row.push(game.add.sprite((j * (_cycleSize + _cyclePadding)) + _cyclePadding, (i * (_cycleSize + _cyclePadding)) + _cyclePadding, _genBitMap[i][j], 0, _GenGroup));
            }
        }

        _GenGroup.x = game.world.width / 2 - _GenGroup.width / 2;
        _GenGroup.y = game.world.height / 2 - _GenGroup.height / 2;

        var _x = 0;
        var _y = 0;
        var hue = 0.00;
        var _sizeUp = _cycleSize / _cycleLength; // size increase to reduce 

        var _timerCycleSize = _cycleSize / _sizeUp;
        var mapIndexI = 0;
        var mapIndexJ = 0;

        var _tickTimer = function () {
            var x = (_x % _timerCycleSize) * _sizeUp;
            var y = (_y % _timerCycleSize) * _sizeUp;
            var I = (mapIndexI % _cycleHeigth);
            var J = (mapIndexJ % _cycleLength);
            var xFactor = 1;
            var yFactor = 1;

            var c = Phaser.Color.HSLtoRGB(hue, 1.0, 0.5);
            var color = "rgb(" + c.r + ", " + c.g + ", " + c.b + ")";

            _genBitMap[I][J].rect(x, y, _sizeUp * xFactor, _sizeUp * yFactor, color);
            _genBitMap[I][J].dirty = true;

            _x += xFactor;
            _y += Number(_x % (_timerCycleSize) == 0) * yFactor;

            if (_y == _timerCycleSize) {
                _x = 0;
                _y = 0;

                hue += 0.1;
                hue = hue > 1.0 ? 0.1 : hue;

                // _tickTimer.delay = (mapIndexJ % _cycleLength) == 0 ? _tickTimer.delay : _tickTimer.delay / 100;
                mapIndexJ += 1;
                mapIndexI += Number((mapIndexJ % _cycleLength) == 0);
            }
        };
    }


    var Generation = function (previousGeneration) {
        var _viewDexInc = 0.1;
        this.genDex = 0;
        this.hueDex = 0.0;
        this.genRate = 0.0;

        if (Utility.typeCheck(previousGeneration, "number")) {
            this.genRate = previousGeneration;
            this.count = 1;
            this.genDex = 0;
        }
        else if (Utility.typeCheck(previousGeneration, "object")) {
            this.genDex = previousGeneration.genDex + 1;
            this.genRate = previousGeneration.genRate / 100;
            this.hueDex = previousGeneration.hueDex + _viewDexInc;
        }

        this.Color = function () {
            var c = Phaser.Color.HSLtoRGB(this.hueDex, 1.0, 0.5);
            return {
                rgbString: "rgb(" + c.r + ", " + c.g + ", " + c.b + ")"
            };
        }
    };

    var Generator = function () {
        this.rate = 0;
        this.count = 0;
    }

    var _timer = game.time.create();
    var fillSquares = function () {

    };

    return {
        load: function (game) { },
        create: function (game) {

        },
        update: function (game) {

        },

        render: function (game) {
            game.debug.text("FrameRate: " + game.time.fps, 10, 12);
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
            var genDelay = 2000;
            game.input.onTap.add(function (item) {
                _totalTaps += 1;

                if (_timer === null) {
                    _timer = game.time.create();
                    _timer.add(genDelay, function () {
                        Cache._active_play_config = {
                            gen0: (_totalTaps / genDelay),
                            gen0Bits: _totalTaps
                        }

                        game.state.start('play');
                    });

                    _timer.start();
                }
            });
        },

        render: function (game) {
            game.debug.text("FrameRate: " + game.time.fps, 10, 12);
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
