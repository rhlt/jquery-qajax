# jQuery-qAjax
_Queued Ajax for [jQuery](https://github.com/jquery/jquery)_\
_by Ruben Holthuijsen_

__[CLICK HERE FOR A LIVE DEMO](https://rubenholthuijsen.nl/qajax/demo)__ ([mirror](https://rhlt.github.io/jquery-qajax/demo.html))

This jQuery plugin adds a new `$.qAjax` function. The main difference is that requests made with `$.qAjax` will be queued: arequest will only be made after the last request is finished. This guarantees that requests will finish in order.

Current version: 21.7.19 ([changelog](https://github.com/rhlt/jquery-qajax/blob/main/CHANGELOG.md))\
Requires jQuery 1.5.0 or above

__[DOWNLOAD jquery-qajax.js](https://raw.githubusercontent.com/rhlt/jquery-qajax/main/jquery-qajax.js)__

## How to use
Include `jquery-qajax.js` after jQuery, and use `$.qAjax` just as you would `$.ajax`. Additionally, you can optionally provide `qKey` and `qTimeout` arguments to the Ajax settings.

### Important caveat
As `$.ajax` will not be called immediately, you can't manipulate the returned jqXHR object such as with `.done`, `.fail`, and `.always`. Instead of `$.ajax('/some-request', { ... }).done(function (data) { ... })`, you can use `$.qAjax('/some-request', { success: function (data) { ... }, ... })`; similarly with `error` instead of `.fail` and `complete` instead of `.always`. For advanced cases, you can use `beforeSend` to manipulate the jqXHR directly. See [jQuery's documentation on $.ajax](https://api.jquery.com/jQuery.ajax/) for more options.

### Ajax settings
In addition to all the settings for jQuery's own `$.ajax` function, you can use add following extra settings to the Ajax settings object:

#### qKey
_(added in 21.7.3)_

A key (string) to identify the request: When a keyed request is added to the queue, any previously queued requests with the same key will be skipped. Note that requests that are already running might still need to finish and return their result later. 

#### qTimeout
_(added in 21.7.19)_

An optional timeout (in milliseconds): When given, this timeout will be applied before the request is added to the queue. This can be used to prevent the request from firing when a newer request has been made with the same `qKey`.
