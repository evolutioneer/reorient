/* Released under the MIT License.
* Ross Smith
* 2011-07-11
* evolutioneer at gmail dot com
*
* Hacked by Andreas Deuschlinger with nice tips by Nils Fisher
* 2012-08-15
* Using more generic onchange solution, than timer or polling
*/

(function($) {

	var orientation = Math.abs(window.orientation) === 90 ? 'landscape' : 'portrait';
	var flag = {
		resize: false,
		orientationchange: false
	};
	var _win = null;

	var resize = function() {
		flag.resize = true;

		if( flag.orientationchange === true )
			reorient();
    };

    var orientationchange = function() {
		flag.orientationchange = true;

		if( flag.resize === true )
			reorient();
    };

    var reorient = function() {

    	flag.resize = false;
		flag.orientationchange = false;

		var orient = Math.abs(window.orientation) === 90 ? 'landscape' : 'portrait';

		if(orient != $.reorient.orientation) {
			$.reorient.orientation = orient;
			_win.trigger('reorient');
		}
    };

	var start = function() {
		_win = _win || $(window);
		// detect orientation change
		_win.bind( 'resize' , resize);	// Android
		_win.bind( 'orientationchange', orientationchange);	// iOS
	};

	var stop = function() {
		_win = _win || $(window);
		// detect orientation change
		_win.unbind( 'resize' , resize);	// Android
		_win.unbind( 'orientationchange', orientationchange);	// iOS
	};

	$.reorient = {
		orientation: orientation,
		start: start,
		stop: stop
	};

})(Zepto);