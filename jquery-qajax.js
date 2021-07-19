/*
qAjax: Queued Ajax for jQuery
version 21.7.19
(c) 2021, Ruben Holthuijsen
https://github.com/rhlt/jquery-qajax/
*/
(function () {
	
	var _queue = [];
	var _keys = {};
	var _busy = false;
	
	var _run = function () {

		if (_busy || !_queue.length)
			return;

		var args = _queue.shift();

		var s = +(args.length != 1);

		while (!args || !args.length || (args[s] && args[s].qKey && _keys[args[s].qKey.toString()] != args)) {
			if (!_queue.length)
				return;
			args = _queue.shift();
		}
		
		if (args[s] && args[s].qKey)
			delete _keys[args[s].qKey.toString()];
		
		_busy = true;

		if (!args[s] || typeof args[s] != 'object')
			args[s] = {};

		if (!args[s].complete || !args[s].complete.length)
			args[s].complete = typeof args[s].complete == 'function' ? [args[s].complete] : [];

		args[s].complete.push(function () {
			_busy = false;
			_run();
		});

		return $.ajax.apply(this, args);
	};

	$.extend({
		qAjax: function () {
			
			var args = arguments;
			var timeout = 0;
			var s = +(args.length != 1);
			
			if (args[s] && args[s].qKey)
				_keys[args[s].qKey.toString()] = args;
			
			if (args[s] && args[s].qTimeout)
				timeout = +args[s].qTimeout;
			
			if (timeout > 0) {
				setTimeout(function () {
					_queue.push(args);
					_run();
				}, timeout);
			} else {
				_queue.push(args);
				_run();
			}
			
		}
	});
})()
