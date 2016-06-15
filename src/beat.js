(function ( undefined ) {

//beat https://github.com/OpenDAWN/UberViz/blob/master/wordproblems/js/AudioHandler.js
  var Beat = function ( dancer, o ) {
    o = o || {};
    this.dancer    = dancer;
    this.frequency = o.frequency !== undefined ? o.frequency : [ 0, 10 ];
    this.threshold = o.threshold !== undefined ? o.threshold :  0.3;
    this.decay     = o.decay     !== undefined ? o.decay     :  0.02;
    this.onBeat    = o.onBeat;
    this.offBeat   = o.offBeat;
    this.isOn      = false;
    this.currentThreshold = this.threshold;

    var _this = this;
    this.dancer.bind( 'update', function () {
      _this.onUpdate();
    });
  };

  Beat.prototype = {
    on  : function () { 
      this.isOn = true;
      return this;
    },
    off : function () {
      this.isOn = false;
      return this;
    },

    set : function ( o ) {
      o = o || {};
      this.frequency = o.frequency !== undefined ? o.frequency : this.frequency;
      this.threshold = o.threshold !== undefined ? o.threshold : this.threshold;
      this.decay     = o.decay     !== undefined ? o.decay : this.decay;
      this.onBeat    = o.onBeat    || this.onBeat;
      this.offBeat   = o.offBeat   || this.offBeat;
    },

    onUpdate : function () {
      if ( !this.isOn ) { return; }
      var magnitude = this.maxAmplitude( this.frequency );
      if ( magnitude >= this.currentThreshold && magnitude >= this.threshold ) {
        this.currentThreshold = magnitude;
        this.onBeat && this.onBeat.call( this.dancer, magnitude );
      } else {
        this.offBeat && this.offBeat.call( this.dancer, magnitude );
        this.currentThreshold -= this.decay;
      }

      /*


    if (volume  > beatCutOff && volume > BEAT_MIN){
      onBeat();
      beatCutOff = volume *1.1;
      beatTime = 0;
    }else{
      if (beatTime <= ControlsHandler.audioParams.beatHoldTime){
        beatTime ++;
      }else{
        beatCutOff *= ControlsHandler.audioParams.beatDecayRate;
        beatCutOff = Math.max(beatCutOff,BEAT_MIN);
      }
    }


    bpmTime = (new Date().getTime() - bpmStart)/msecsAvg;

    */
    },
    maxAmplitude : function ( frequency ) {
      var
        max = 0,
        fft = this.dancer.getSpectrum();

      // Sloppy array check
      if ( !frequency.length ) {
        return frequency < fft.length ?
          fft[ ~~frequency ] :
          null;
      }

      for ( var i = frequency[ 0 ], l = frequency[ 1 ]; i <= l; i++ ) {
        if ( fft[ i ] > max ) { max = fft[ i ]; }
      }
      return max;
    }
  };

  window.Dancer.Beat = Beat;
})();
