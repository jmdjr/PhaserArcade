// establish namespace
var PhaserArcade = window.PhaserArcade || {};
var Games = PhaserArcade.Games = PhaserArcade.Games || {};
var States = Games.States = Games.States || {};
var Cache = Games.Cache = Games.Cache || {};
var Utility = PhaserArcade.Utility = PhaserArcade.Utility || {};
var Objects = Games.Objects = Games.Objects || {};

PhaserArcade.Games.Objects.Problem = function (solution) {
   var _isCorrect = false;
   var _isComplete = false;

   var _attempts = 0;
   var _tempTimestamp = null;
   var _timeSpent = 0;

   var _solution = solution;

   // records starting time, establishing the span in which the problem is attempted
   this.start = function () {
      _tempTimestamp = new Date();
   };

   // Compares attempt value to solution, records number of attempts, 
   //   whether the attempt is correct, and records the time spent on this problem.
   // Returns whether the guess was correct or not.
   //   guess function stops recording once solution is found. problem is considered complete.
   this.guess = function (attempt) {
      if (!_isComplete) {
         if (attempt == _solution) {
            _isCorrect = true;
            _isComplete = true;
            _tempTimestamp = null;
            this.timeElapsed();
         }

         _attempts = _attempts + 1;
      }
      return _isCorrect;
   }

   // Returns whether or not this problem has been solved.
   //   does not count as attempt or record any information.
   this.isCorrect = function () {
      return _isCorrect;
   }

   // Returns if we are completed with this problem. 
   //  has a slightly different meaning than solved, as a problem can be forced completed
   //  by game logic (limited time, attempt counts, in-game purpose)
   this.isComplete = function () {
      return _isComplete;
   }

   // Manually forces a problem to be completed.
   //  once a problem is completed, it can not be modified.
   this.forceComplete = function () {
      if (!_isComplete) {
         _isComplete = true;
         _tempTimestamp = null;
         this.timeElapsed();
      }
   }

   // Returns number of attempts so far.
   this.attempts = function () {
      return _attempts;
   }

   // Returns amount of time spent on problem so far.
   this.timeElapsed = function () {
      if (_tempTimestamp != null) {
         _timeSpent = new Date() - _tempTimestamp;
      }

      return _timeSpent;
   }

   // Returns the solution for reference.
   this.solution = function () {
      return _solution;
   }

   // For Debug purposes only.
   this._print = function (probName) {
      console.log("Problem: " + probName + "-----------------------------------"
         + "\nSolution: " + this.solution()
         + "\nisCorrect: " + this.isCorrect()
         + "\nisComplete: " + this.isComplete()
         + "\nAttempts: " + this.attempts()
         + "\ntime elapsed: " + this.timeElapsed()
      );
   }

   return this;
}

window.PhaserArcade = PhaserArcade;