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

	var flag = flag || ( function() {

		var RESIZE = 1,
			ORIENTATIONCHANGE = 2,
			CHECKED = 3;

		return {
			value: 0,
			RESIZE: function() {
				return RESIZE;
			},
			ORIENTATIONCHANGE: function() {
				return ORIENTATIONCHANGE;
			},
			CHECKED: function() {
				return CHECKED;
			}
		};
	})();

	var _win = null;

	var resize = function() {
		flag.value |= flag.RESIZE();

		if( flag.value & flag.CHECKED() )
			reorient();
    };

    var orientationchange = function() {
		flag.value |= flag.ORIENTATIONCHANGE();

		if( flag.value & flag.CHECKED() )
			reorient();
    };

    var reorient = function() {

    	flag.value = 0;

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