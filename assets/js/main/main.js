$( document ).ready( function() {
	if ( globalDebug ) {
		console.group( 'document:ready' );
	}

	handlersOnce();

	if ( globalDebug ) {
		console.groupEnd();
	}
});

$window.on( 'load', function() {
	if ( globalDebug ) {
		console.group( 'window:load' );
	}

	handlers();

	if ( globalDebug ) {
		console.groupEnd();
	}
});

$window.on( 'resize', function() {
	if ( globalDebug ) {
		console.log( 'window:resize' );
	}

	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
} );

var doOnResize = debounce( function() {
	if ( globalDebug ) {
		console.group( 'window:resize:debounce' );
	}

	handlers();

	if ( globalDebug ) {
		console.groupEnd();
	}
}, 250 );

window.addEventListener( 'resize', doOnResize );

function handlersOnce() {
	// Here should lie stuff like bindings
	// and other sutff that should 
	// be executed only once

	detectIE();
}

function handlers() {
	// Here should lie stuff that
	// should be executed once on page load
	// and on every resize of the page
}
