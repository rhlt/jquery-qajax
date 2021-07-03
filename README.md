# jQuery-qAjax
Queued Ajax for jQuery

## Usage
Simply include `jquery-qajax.js` after jQuery, and use `$.qAjax` just as you would `$.ajax`. The main difference is that requests made with `$.qAjax` will each be made after the last request is finished, rather than all at once. This guarantees that requests will finish in order.

Additionally, you can optionally provide a `qKey` argument to the Ajax settings. When a keyed request is added to the queue, any previously queued requests with the same key will be skipped. Note that requests that are already running might still finish later.

*Caveat*: As `$.ajax` will not be called immediately, you can't manipulate the returned jqXHR object such as with `.done`, `.fail`, and `.always`. Instead of `$.ajax('/some-request', { ... }).done(function (data) { ... })`, you can use `$.qAjax('/some-request', { success: function (data) { ... }, ... })`; similarly with `error` instead of `.fail` and `complete` instead of `.always`. For advanced cases, you can use `beforeSend` to manipulate the jqXHR directly. See [jQuery's documentation on $.ajax](https://api.jquery.com/jQuery.ajax/) for more options.
