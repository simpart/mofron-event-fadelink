/**
 * @file mofron-event-fadelink/index.js
 * @brief right click event for mofron
 * ## event function parameter
 *  - component: event target component object
 *  - event: "click" event object by addEventListener
 *  - mixed: user specified parameter
 * @license MIT
 */
const Click = require('mofron-event-click');
const bodyfade = require('mofron-util-bodyfade');

module.exports = class extends Click {
    /**
     * initialize event
     * 
     * @param (mixed) short-form parameter
     *                key-value: event config
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname('FadeLink');
            this.shortForm('url');

            this.confmng().add("url", { type: "string", init: "./" });
	    this.confmng().add("newtab", { type: "boolean", init: false });

	    if (0 < arguments.length) {
                this.config(p1);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    contents (tgt_dom) {
        try {
	    super.contents(tgt_dom);
	    let link = this;
            this.listener(
                () => {
                    try {
                        bodyfade.fadeout();
                        setTimeout(() => {
                            if (true === link.newtab()) {
                                window.open(link.url(), '_blank');
                            } else {
                                window.location.href = link.url();
                            }
                        },200);
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                this
            );
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    /**
     * jump url
     *
     * @param (string) jump url (default is './')
     * @type parameter
     */
    url (prm) {
        try {
            return this.confmng("url", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /**
     * newtab flag
     * 
     * @param (boolean) true: jump to url by newtab (default)
     *                  false: jump to url by current tab
     * @type parameter
     */
    newtab (prm) {
        try {
            return this.confmng("newtab",prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
