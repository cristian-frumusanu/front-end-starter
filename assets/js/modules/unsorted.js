// Unsorted functions that cannot have their own module file

function getIEVersion() {
    var sAgent = window.navigator.userAgent;
    var Idx = sAgent.indexOf("MSIE");
    // If IE, return version number.
    if (Idx > 0)
        return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

    // If IE 11 then look for Updated user agent string.
    else if (!!navigator.userAgent.match(/Trident\/7\./))
        return 11;

    else
        return 0; //It is not IE
}

function detectIE() {
	var ieVersion = getIEVersion();
	if ( ieVersion > 0 ) {
		$html.addClass( 'is--ie' + ieVersion );
	}
}
