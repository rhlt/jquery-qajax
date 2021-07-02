# jQuery-qAjax
Queued Ajax for jQuery

## Usage
Simply include `jquery-qajax.js` after jQuery, and use `$.qAjax` just as you would `$.ajax`. The only difference is that requests made with `$.qAjax` will each be made after the last request is finished, rather than all at once. This guarantees that requests will finish in order.

Caveat: As `$.ajax` will not be called immediately, you can't manipulate the returned jqXHR object such as in `$.qAjax('/some-request', { ... }).done(function () { ... })`. Instead, use `$.qAjax('/some-request', { success: function () { ... }, ... })`.
