
var PhaserArcade = window.PhaserArcade || {};
var Utility = PhaserArcade.Utility = PhaserArcade.Utility || {};
var Games = PhaserArcade.Games = PhaserArcade.Games || {};
var States = PhaserArcade.Games.States = PhaserArcade.Games.States || {};
var Cache = PhaserArcade.Games.Cache = PhaserArcade.Games.Cache || {};
Games.Objects = Games.Objects || {};

PhaserArcade.Utility = {
	_DebugableGames:  ["PlugGame", "POT"],
	_Debug: false,
	_AutoGameIndex: 0,
	_bmd: null,
	debugCanvas: function () {
		// Somewhere to draw to
		if (!this._bmd) {
			this._bmd = game.add.bitmapData(1920, 1080);
			this._bmd.addToWorld();
		}
		return this._bmd;
	},

	clearDebugCanvas: function () {
		this.debugCanvas().clear();
	},

	shuffle: function (a) {
		for (let i = a.length; i; i--) {
			let j = Math.floor(Math.random() * i);
			var temp = a[j];
			a[j] = a[i - 1];
			a[i - 1] = temp;
		}
	},

	hashMap: function (hash, name, object) {
		if (Utility.isUndef(hash)
			|| Utility.isUndef(hash.length)) {
			console.error("Utility.HashMap: invalid hash");
			return null;
		}

		if (!Utility.typeCheck(name, "string")) {
			console.error("Utility.HashMap: invalid name");
			return null;
		}

		if (!Utility.isUndef(object)) {
			if (hash.indexOf(name) == -1) {
				hash.push(name);
			}

			hash[name] = object;
		}

		return hash;
	},

	typeCheck: function (object, typeName) {
		return typeof (object) === typeName;
	},

	isUndef: function (object) { return Utility.typeCheck(object, "undefined"); },

	// returns an object for debugging, which will allow real-time manipulation of a debug line, 
	//  and can be called to report the coordinates of the line.
	LineBuilder: function (game) {
		if (this._Debug) {
			var __x = [];
			var __y = [];

			var _isDirty = true;

			var increment = 1 / game.width;

			var debugPaths = [];

			var dontFollow = false;
			var activeNode = 0;

			this.SetForStateChange = function () {
				_isDirty = true;
			}

			// establish mouse controls
			this.OnLoadStateBindControls = function () {
				if (_isDirty) {
					_isDirty = false;
					this.debugCanvas().addToWorld();
					game.input.onUp.add(function (mouse, event) {
						if (event.shiftKey) {
							__x.push(Math.floor(mouse.x));
							__y.push(Math.floor(mouse.y));
							activeNode = __x.length - 1;
						}
						else if (__x.length >= 0) {
							__x[activeNode] = Math.floor(mouse.x);
							__y[activeNode] = Math.floor(mouse.y);
						}

						dontFollow = true;
					});

					game.input.onDown.add(function (mouse, event) {
						if (__x.length >= 0 && event.shiftKey) {
							dontFollow = true;
						}
						else {
							dontFollow = false;
						}
					});

					game.input.keyboard.onDownCallback = function (event) {
						if (event.key == "a" && activeNode > 0) {
							activeNode -= 1;
						}
						else if (event.key == "d" && activeNode < __x.length - 1) {
							activeNode += 1;
						}
						else if (event.key == "Backspace") {
							__x.splice(activeNode, 1);
							__y.splice(activeNode, 1);

							if (activeNode == __x.length) {
								activeNode -= 1;
							}
						}
						else if (event.key == "p") {
							print();
						}
					}
				}
			}

			// Somewhere to draw to
			this.redraw = function () {
				if (!dontFollow) {
					__x[activeNode] = Math.floor(game.input.activePointer.x);
					__y[activeNode] = Math.floor(game.input.activePointer.y);
				}

				// Draw the path
				for (var i = 0; i < 1; i += increment) {
					var posx = game.math.catmullRomInterpolation(__x, i);
					var posy = game.math.catmullRomInterpolation(__y, i);
					this.debugCanvas().rect(posx, posy, 3, 3, 'rgba(245, 0, 0, 1)');
				}

				for (var pathIndex = 0; pathIndex < debugPaths.length; pathIndex += 1) {
					var path = debugPaths[pathIndex];

					for (var i = 0; i < 1; i += increment) {
						var posx = game.math.catmullRomInterpolation(path.x, i);
						var posy = game.math.catmullRomInterpolation(path.y, i);
						this.debugCanvas().rect(posx, posy, 2, 2, 'rgba(200, 100, 200, 1)');
					}

					for (var i = 0; i < path.x.length; i += 1) {
						this.debugCanvas().rect(path.x[i], path.y[i], 4, 4, 'rgba(255, 255, 0, 1)');
					}
				}

				for (var i = 0; i < __x.length; i += 1) {
					if (activeNode != i) {
						this.debugCanvas().rect(__x[i], __y[i], 8, 8, 'rgba(255, 255, 0, 1)');
					}
					else {
						this.debugCanvas().rect(__x[i], __y[i], 8, 8, 'rgba(128, 128, 0, 1)');
					}
				}
			}

			this.addDebugPath = function (addPath) {
				debugPaths.push(addPath);
			}

			this.popDebugPath = function () {
				debugPaths.pop();
			}

			this.replacePath = function (object) {
				if (object) {
					if (object.x) {
						__x = object.x;
					}
					if (object.y) {
						__y = object.y;
					}

				}
			}

			var print = this.print = function () {
				var outX = "'x':[";
				var outY = "'y':[";

				for (var i = 0; i < __x.length; i += 1) {
					outX += __x[i] + (i < __x.length - 1 ? ", " : "],");
					outY += __y[i] + (i < __x.length - 1 ? ", " : "]");
				}

				console.log("{\n" + outX + "\n" + outY + "\n}");
			}

			return this;
		}

		return null;
	},

	scaleToInt: function (random, min, max) {
		return Math.floor((max - min + 1) * random + min);
	},

	// the General UI buttons. placeholders for the real buttons that will go on ui. do not alter anchor of button.
	makeButton: function (game, x, y, text, OnUpHandle) {
		var button = game.add.button(x, y, "ui-button", function (button, mouse) {
			if (mouse.targetObject != null && mouse.targetObject.sprite == button) {
				OnUpHandle(button, mouse);
			}
		}, this, 1, 0, 1, 0);

		var buttonText = game.add.text(0, 0, text, { fill: "#ffffff", align: "center" });
		var finalWidth = buttonText.width;
		buttonText.width = button.width - 10;
		button.width = finalWidth;
		buttonText.anchor.setTo(0.5, 0.5);
		button.addChild(buttonText);

		buttonText.x = (buttonText.width + 10) / 2;
		buttonText.y = button.height / 2;
		return button;
	},

	line: null,
	drawVector(start, end) {
		//if (!this.line) {
		//	this.line = new Phaser.Line(0, 0, 1000, 1000);
		//}
		//game.debug.geom(this.line, '#FF0000');
	}
}

Utility = PhaserArcade.Utility;
