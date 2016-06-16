/*
 * Beat plugin for dancer.js
 *
 * Usage of frequencies being 2px with 1px spacing:
 *
 * var dancer = new Dancer('song.ogg'),
 *     canvas = document.getElementById('beatcanvas');
 * dancer.beat( canvas, { width: 2, spacing: 1 });
 */

(function() {
  Dancer.addPlugin( 'beat', function( canvasEl, options ) {
    options = options || {};
    var
      ctx     = canvasEl.getContext( '2d' ),
      h       = canvasEl.height,
      w       = canvasEl.width,
      max_size   = options.size || 40,
      bgFill = options.bgFill || "#444",
      fgFill = options.fgFill || "#0F0";

    this.bind( 'update', function() {
      //var spectrum = this.getSpectrum();
      ctx.clearRect( 0, 0, w, h );
      var size = max_size - this.Beat.bpmTime*max_size;
      ctx.fillStyle = bgFill;
      ctx.fillRect(0,0, max_size, max_size);
      //ctx.fillStyle="#0F0";
      //ctx.fillRect((max_size - size)/2,chartH + (max_size - size)/2, size, size);*/
    });

    return this;
  });
})();
