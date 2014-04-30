/**
 * Google Analytics reltaed helper
 * Author : LesPolypodes.com 
 * License : MIT
 * Disclaimer: This depends on jQuery
 */
var GoogleAnalyzer = function(){

    var outboundLinksExcludeClassName = "notAnOutbound",
        list = [],
        foo = '',
        host = document.location.host;

    var init = function() {
        list = $("a")
            .not("." + this.outboundLinksExcludeClassName)
            .not("a[href^='/']")
            .not("a[href^='mailto']")
            .not("a[href^='ftp']")
            .not("a[href^='file']")
            .not("a[href^='tel']")
            .not("a[href^='fax']")
            .not("a[href^='data']")
            .not("a[href^='javascript']")
            .not("a[href^='#']");
        $(list).on('click', trackOutboundLink);
    }

    /**
     * Send outblound event to GA server using API
     */
    var trackOutboundLink = function(ev) {
        _gaq.push(["_trackEvent", "Outgoing Links", this.href, document.location.pathname + document.location.search]);
    };

    /**
     * Exposes public methods only
     */
    return {
        init:init,
        trackOutboundLink:trackOutboundLink,
    }

}
