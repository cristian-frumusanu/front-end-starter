var gulp = require( 'gulp-help' )( require( 'gulp' ) );

// Gulp / Node utilities
var u = require( 'gulp-util' );
var log = u.log;
var c = u.colors;
var exec = require( 'gulp-exec' );
var del = require( 'del' );
var fs = require( 'fs' );
var rename = require( 'gulp-rename' );
var replace = require( 'gulp-replace' );
var prompt = require( 'gulp-prompt' );

// Basic workflow plugins
var prefix = require( 'gulp-autoprefixer' );
var sass = require( 'gulp-sass' );
var sourcemaps = require( 'gulp-sourcemaps' );
var concat = require( 'gulp-concat' );
var csscomb = require( 'gulp-csscomb' );
var cmq = require( 'gulp-combine-mq' );
var sequence = require( 'gulp-sequence' );

var jsFiles = [
	'./assets/js/main/wrapper-start.js',
	'./assets/js/main/shared-vars.js',
	'./assets/js/modules/*.js',
	'./assets/js/main/main.js',
	'./assets/js/main/wrapper-end.js',
	'./assets/js/plugins/*.js'
];


function logError( err, res ) {
	log( c.red( 'Sass failed to compile' ) );
	log( c.red( '> ' ) + err.file.split( '/' )[err.file.split( '/' ).length - 1] + ' ' + c.underline( 'line ' + err.line ) + ': ' + err.message );
}


// ------------------------
// Combine SCSS files
// ------------------------
gulp.task( 'styles', 'Compiles main css files (ie. style.css editor-style.css)', function() {

	return gulp.src( 'assets/scss/*.scss' )
	           .pipe( sass({ style: 'compressed' }).on( 'error', logError ) )
	           .pipe( prefix() )
	           .pipe( gulp.dest( 'assets/css' ) );
} );

function logError (error) {
	console.log(error.toString());
	this.emit('end');
}

// ------------------------
// Combine JavaScript files
// ------------------------
gulp.task( 'scripts', 'Concatenate all JS into main.js and wrap all code in a closure', function() {
	return gulp.src( jsFiles )
		// Concatenate all our files into main.js
		.pipe( concat( 'main.js' ) )
		.pipe( gulp.dest( './assets/js/' ) );
} );


gulp.task( 'server', 'Compile scripts and styles for production purposes', ['styles', 'scripts'], function() {
	console.log( 'The styles and scripts have been compiled for production! Go and clear the caches!' );
} );


gulp.task( 'watch', 'Watch for changes to various files and process them', function() {
	gulp.watch( 'assets/scss/**/*.scss', ['styles'] );
	gulp.watch( 'assets/js/**/*.js', ['scripts'] );
} );
