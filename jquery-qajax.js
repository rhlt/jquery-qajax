// Queued Ajax for jQuery
// https://github.com/rhlt/jquery-qajax/
// (c) 2021, Ruben Holthuijsen
(function () {
	var _queue = [],
		_busy = false,
		_run = function () {

		if (_busy || !_queue.length)
			return;

		var args = _queue.pop();

		if (!args || !args.length)
			return _run();

		_busy = true;

		var s = +(args.length != 1);

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
			_run();
		}
	});
})();
