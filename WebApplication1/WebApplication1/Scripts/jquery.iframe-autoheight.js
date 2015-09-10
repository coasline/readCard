jQuery.fn.extend(
{
    iframeAutoHeight: function (callback, stayInSecond) {
        this.each(function () {
            var w = this;
            $(this).load(function () {
                var cnt = 0;
                var lastHeight = 0;
                setTimeout(function () {
                    try {
                        //var bHeight = w.contentWindow.document.body.offsetHeight;
                        //var dHeight = w.contentWindow.document.documentElement.offsetHeight;
                        //var contentHeight = Math.max(bHeight, dHeight);

                        //var bWidth = w.contentWindow.document.body.offsetWidth;
                        //var dWidth = w.contentWindow.document.documentElement.offsetWidth;
                        //var contentWidth = Math.max(bWidth, dWidth);

                        //var contentHeight = 0;
                        //var contentWidth = 0;
                        //if (w.contentDocument && w.contentDocument.body.offsetHeight) {
                        //    contentHeight = w.contentDocument.body.offsetHeight;
                        //    contentWidth = w.contentDocument.body.offsetWidth;
                        //} else if (w.Document && w.Document.body.scrollHeight) {
                        //    contentHeight = w.Document.body.scrollHeight;
                        //    contentWidth = w.Document.body.scrollWidth;
                        //}

                        var contentHeight = 0;
                        var contentWidth = 0;
                        var isChrome = navigator.userAgent.toLowerCase().match(/chrome/) != null;
                        if (isChrome) {
                            contentHeight = w.contentWindow.document.documentElement.scrollHeight;
                            contentWidth = w.contentWindow.document.documentElement.scrollWidth;
                        }
                        else {
                            contentHeight = w.contentWindow.document.body.scrollHeight;
                            contentWidth = w.contentWindow.document.body.scrollWidth;
                        }

                        if (lastHeight != contentHeight) {
                            $(w).css("height", contentHeight);
                            lastHeight = contentHeight;
                            if (callback) callback(lastHeight, w.contentDocument ? w.contentDocument : w.Document);
                        }
                        if ((contentWidth - $(w).width()) > 20) {
                            $(w).width(contentWidth);
                        }
                    } catch (e) {

                    }
                    if (++cnt < ((stayInSecond || 3600) * 2)) setTimeout(arguments.callee, 500);
                }, 100);
            });
        });
    }
});