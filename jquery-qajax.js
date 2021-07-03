// Queued Ajax for jQuery
// https://github.com/rhlt/jquery-qajax/
// (c) 2021, Ruben Holthuijsen
(function () {
	var _queue = [],
		_keys = {},
		_busy = false,
		_run = function () {

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
			_queue.push(arguments);
			var s = +(arguments.length != 1);
			if (arguments[s] && arguments[s].qKey)
				_keys[arguments[s].qKey.toString()] = arguments;
			_run();
		}
	});
})();
