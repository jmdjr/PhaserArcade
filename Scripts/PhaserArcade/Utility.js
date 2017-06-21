// establish namespace
var PhaserArcade = window.PhaserArcade || {};
var Games = PhaserArcade.Games = PhaserArcade.Games || {};
var States = Games.States = Games.States || {};
var Cache = PhaserArcade.Games.Cache = PhaserArcade.Games.Cache || {};
var Utility = PhaserArcade.Utility = PhaserArcade.Utility || {};


PhaserArcade.Utility = {
   _Debug: false,
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

   isUndef: function (object) { return typeCheck(object, "undefined"); },

   // returns an object for debugging, which will allow real-time manipulation of a debug line, 
   //  and can be called to report the coordinates of the line.
   LineBuilder: function (game) {
      game.debug.inputInfo(10, 10);

      var __x = [];
      var __y = [];
      var dontFollow = false;
      var activeNode = 0;

      // establish mouse controls
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

      var increment = 1 / game.width;

      // Somewhere to draw to
      var bmd = game.add.bitmapData(game.stage.width, game.stage.height);
      bmd.addToWorld();

      this.redraw = function () {

         bmd.clear();

         if (!dontFollow) {
            __x[activeNode] = Math.floor(game.input.activePointer.x);
            __y[activeNode] = Math.floor(game.input.activePointer.y);
         }

         // Draw the path
         for (var i = 0; i < 1; i += increment) {
            var posx = game.math.catmullRomInterpolation(__x, i);
            var posy = game.math.catmullRomInterpolation(__y, i);
            bmd.rect(posx, posy, 3, 3, 'rgba(245, 0, 0, 1)');
         }

         for (var i = 0; i < __x.length; i += 1) {
            if (activeNode != i) {
               bmd.rect(__x[i], __y[i], 8, 8, 'rgba(255, 255, 0, 1)');
            }
            else {
               bmd.rect(__x[i], __y[i], 8, 8, 'rgba(128, 128, 0, 1)');
            }
         }
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

         for (var i = 0; i < __x.length; i += 1)
         {
            outX += __x[i] + (i < __x.length - 1 ? ", " : "],");
            outY += __y[i] + (i < __x.length - 1 ? ", " : "]");
         }

         console.log("{\n" + outX + "\n" + outY + "\n}");
      }

      return this;
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
   }
}

window.PhaserArcade = PhaserArcade;