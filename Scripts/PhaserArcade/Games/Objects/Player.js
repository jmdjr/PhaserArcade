// A player collects problems
// measures rate of answering problems, accuracy, position amoung other racers.
// probably going to need to generate players that can play automatically.

// establish namespace
var PhaserArcade = window.PhaserArcade || {};
var Games = PhaserArcade.Games = PhaserArcade.Games || {};
var States = Games.States = Games.States || {};
var Cache = PhaserArcade.Games.Cache = PhaserArcade.Games.Cache || {};
var Utility = PhaserArcade.Utility = PhaserArcade.Utility || {};
var Objects = Games.Objects = Games.Objects || {};



PhaserArcade.Games.Objects.Player = function() {
   this._problems = [];

   // Give the player a problem
   this.addProblem = function(problem) {
      this._problems.push(problem);
   }

   // View player's last problem
   this.lastProblem = function () {
      return this._problems[this._problems.length - 1];
   }

   // Count the number of problems player has
   this.problemCount = function () {
      return this._problems.length;
   }

   // Total time spent on problems in milliseconds, summed from each individual problem
   this.totalProblemTime = function () {
      var time = 0, _i = 0;

      while (_i < this._problems.length) {
         time += this._problems[_i].timeElapsed();
         _i += 1;
      }

      return time;
   }

   // returns the number of consecutive correct answers before the end (excluding any incomplete answers)
   this.currentConsecutiveCorrect = function () {
      var accumulate = 0;
      var firstComplete = this._problems.findIndex(function (item) { return !item.isComplete(); });
      firstComplete = firstComplete <= 0 ? this._problems.length : firstComplete;

      for (var _i = firstComplete - 1; _i >= 0 && this._problems[_i].isCorrect(); --_i, ++accumulate);

      return accumulate;
   }

   // returns the number of consecutive correct answers before the end (excluding any incomplete answers)
   this.highestConsecutiveCorrect = function () {
      var accumulate = 0;
      var highest = 0;

      for (var _i = 0; _i < this._problems.length; ++_i) {
         if (this._problems[_i].isCorrect()) {
            accumulate++;
         }
         else {
            highest = accumulate > highest ? accumulate : highest;
            accumulate = 0;
         }
      }

      return highest;
   }

   // Count of the total number of correct problems
   this.correctProblemCount = function () {
      return this._problems.filter(function (p) { return p.isCorrect(); }).length;
   }

   this.problemsPerMinute = function () {
      return this.problemCount() / this.totalProblemTime() * 1000 * 60;
   }

   this.correctProblemsPerMinute = function () {
      return (this.correctProblemCount() / this.totalProblemTime()) *  1000 * 60;
   }

   // Debug printing code.
   this._print = function (name) {
      return "Player: " + name
         + "\nNumber of Problems: " + this.problemCount()
         + "\nCorrect: " + this.correctProblemCount()
         + "\nTotalTime: " + this.totalProblemTime()
         + "\nGuesses/Minute: " + this.problemsPerMinute()
         + "\nCorrect Problems/Minute: " + this.correctProblemsPerMinute();
   }
}

window.PhaserArcade = PhaserArcade;