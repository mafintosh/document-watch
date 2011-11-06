# Document Watch

Document is a little module that enables you to do one thing, watch for changes in documents in an atomic way.  
It's available through npm:

	npm install document-watch

And it's super easy to use:

``` js
var watch = require('document-watch');

var doc = {hello:'world', count:0};

var unwatch = watch(doc, function(changes) {
	console.log(changes);
});

doc.hello = 'other world';
doc.count++;

// the above modifications results in the 
// watch callback being called on nextTick with
// changes = {hello:'other world', count:1}
``` js