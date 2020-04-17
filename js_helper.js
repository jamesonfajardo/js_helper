// TABLE OF CONTENTS:

// LAZY LOADING - https://github.com/indexcodex/lazyload
//  --  Load image when it is visible in the viewport

// CLAMP JS - https://github.com/josephschmitt/Clamp.js
//  --  Clamps (ie. cuts off) an HTML element's content by adding ellipsis to it if the content inside is too long

// CountUp - https://github.com/indexcodex/countup
//  --  count up to the desired integer incrementally

// inViewport - https://github.com/indexcodex/inviewport
//  --  run a user defined funCtion when the target element is in viewport

// getCookie - https://github.com/indexcodex/getCookie, https://www.w3schools.com/js/js_cookies.asp
//  --  get cookie value by supplying the cookie name

//! ----------------------------------------------------------------------------------------------
//! ----------------------------------------------------------------------------------------------

// LAZY LOADING - https://github.com/indexcodex/lazyload
// --  Load image when it is visible in the viewport
// --  in your image tag, src should contain the placeholder image, while data-src should contain the actual image
// --  this is the only step needed for lazyloading to work. the script will handle the rest

//* src = the placeholder image
//* data-src = the actual image

// todo
//* <img src="link-to-placeholder-image" data-src="link-to-actual-image" />
// todo

function lazyLoad() {
    let lazyImg = document.querySelectorAll('img[src][data-src]');
    let i = 0;
    let n = lazyImg.length
    let windowHeight = window.innerHeight;
    for (i; i < n; i++) {
        let boundingClientRect = lazyImg[i].getBoundingClientRect();
        if (lazyImg[i].hasAttribute("data-src") && boundingClientRect.top < windowHeight) {
            lazyImg[i].setAttribute("src", lazyImg[i].getAttribute("data-src"));
            lazyImg[i].removeAttribute("data-src");
        }
    }
}

document.addEventListener('scroll', lazyLoad);
window.addEventListener('load', lazyLoad);
window.addEventListener('resize', lazyLoad);

//! ----------------------------------------------------------------------------------------------
//! ----------------------------------------------------------------------------------------------

// CLAMP JS - https://github.com/josephschmitt/Clamp.js
// --  Clamps (ie. cuts off) an HTML element's content by adding ellipsis to it if the content inside is too long.
// --  The $clamp method is the primary way of interacting with Clamp.js, and it takes two arguments. The first is the element which should be clamped, and the second is an Object with options in JSON notation.

// todo
// clamp (Number | String | 'auto'). This controls where and when to clamp the text of an element. Submitting a number controls the number of lines that should be displayed. Second, you can submit a CSS value (in px or em) that controls the height of the element as a String. Finally, you can submit the word 'auto' as a string. Auto will try to fill up the available space with the content and then automatically clamp once content no longer fits. This last option should only be set if a static height is being set on the element elsewhere (such as through CSS) otherwise no clamping will be done.
// useNativeClamp (Boolean). Enables or disables using the native -webkit-line-clamp in a supported browser (ie. Webkit). It defaults to true if you're using Webkit, but it can behave wonky sometimes so you can set it to false to use the JavaScript- based solution.
// truncationChar (String). The character to insert at the end of the HTML element after truncation is performed. This defaults to an ellipsis (…).
// truncationHTML (String). A string of HTML to insert before the truncation character. This is useful if you'd like to add a "Read more" link or some such thing at the end of your clamped node.
// splitOnChars (Array). Determines what characters to use to chunk an element into smaller pieces. Version 0.1 of Clamp.js would always remove each individual character to check for fit. With v0.2, you now have an option to pass a list of characters it can use. For example, it you pass an array of ['.', ',', ' '] then it will first remove sentences, then remove comma-phrases, and remove words, and finally remove individual characters to try and find the correct height. This will lead to increased performance and less looping when removing larger pieces of text (such as in paragraphs). The default is set to remove sentences (periods), hypens, en-dashes, em-dashes, and finally words (spaces). Removing by character is always enabled as the last attempt no matter what is submitted in the array.
// animate (Boolean). Silly little easter-egg that, when set to true, will animate removing individual characters from the end of the element until the content fits. Defaults to false.
// todo

//* 1st parameter: the element to clamp
//* 2nd parameter: how the element will be clamped (json format)
//Single line
//* $clamp(myHeader, { clamp: 1 });
// Multi-line
//* $clamp(myHeader, { clamp: 3 });
// Auto-clamp based on available height
//* $clamp(myParagraph, { clamp: 'auto' });
//Auto-clamp based on a fixed element height
//* $clamp(myParagraph, { clamp: '35px' });

(function () {
    window.$clamp = function (c, d) {
        function s(a, b) { n.getComputedStyle || (n.getComputedStyle = function (a, b) { this.el = a; this.getPropertyValue = function (b) { var c = /(\-([a-z]){1})/g; "float" == b && (b = "styleFloat"); c.test(b) && (b = b.replace(c, function (a, b, c) { return c.toUpperCase() })); return a.currentStyle && a.currentStyle[b] ? a.currentStyle[b] : null }; return this }); return n.getComputedStyle(a, null).getPropertyValue(b) } function t(a) { a = a || c.clientHeight; var b = u(c); return Math.max(Math.floor(a / b), 0) } function x(a) {
            return u(c) *
                a
        } function u(a) { var b = s(a, "line-height"); "normal" == b && (b = 1.2 * parseInt(s(a, "font-size"))); return parseInt(b) } function l(a) { if (a.lastChild.children && 0 < a.lastChild.children.length) return l(Array.prototype.slice.call(a.children).pop()); if (a.lastChild && a.lastChild.nodeValue && "" != a.lastChild.nodeValue && a.lastChild.nodeValue != b.truncationChar) return a.lastChild; a.lastChild.parentNode.removeChild(a.lastChild); return l(c) } function p(a, d) {
            if (d) {
                var e = a.nodeValue.replace(b.truncationChar, ""); f || (h = 0 < k.length ?
                    k.shift() : "", f = e.split(h)); 1 < f.length ? (q = f.pop(), r(a, f.join(h))) : f = null; m && (a.nodeValue = a.nodeValue.replace(b.truncationChar, ""), c.innerHTML = a.nodeValue + " " + m.innerHTML + b.truncationChar); if (f) { if (c.clientHeight <= d) if (0 <= k.length && "" != h) r(a, f.join(h) + h + q), f = null; else return c.innerHTML } else "" == h && (r(a, ""), a = l(c), k = b.splitOnChars.slice(0), h = k[0], q = f = null); if (b.animate) setTimeout(function () { p(a, d) }, !0 === b.animate ? 10 : b.animate); else return p(a, d)
            }
        } function r(a, c) { a.nodeValue = c + b.truncationChar } d = d || {};
        var n = window, b = { clamp: d.clamp || 2, useNativeClamp: "undefined" != typeof d.useNativeClamp ? d.useNativeClamp : !0, splitOnChars: d.splitOnChars || [".", "-", "\u2013", "\u2014", " "], animate: d.animate || !1, truncationChar: d.truncationChar || "\u2026", truncationHTML: d.truncationHTML }, e = c.style, y = c.innerHTML, z = "undefined" != typeof c.style.webkitLineClamp, g = b.clamp, v = g.indexOf && (-1 < g.indexOf("px") || -1 < g.indexOf("em")), m; b.truncationHTML && (m = document.createElement("span"), m.innerHTML = b.truncationHTML); var k = b.splitOnChars.slice(0),
            h = k[0], f, q; "auto" == g ? g = t() : v && (g = t(parseInt(g))); var w; z && b.useNativeClamp ? (e.overflow = "hidden", e.textOverflow = "ellipsis", e.webkitBoxOrient = "vertical", e.display = "-webkit-box", e.webkitLineClamp = g, v && (e.height = b.clamp + "px")) : (e = x(g), e <= c.clientHeight && (w = p(l(c), e))); return { original: y, clamped: w }
    }
})();

//! ----------------------------------------------------------------------------------------------
//! ----------------------------------------------------------------------------------------------

// CountUp - https://github.com/indexcodex/countup
// --  count up to the desired integer incrementally

// todo
// step 1: Create a CountUp object
//* const counter = new IXCX_CountUp({})

// step 2: Fill in the following data:
//  --  target (required) : Your target element via getElementById, querySelector, etc..
//  --  end (optional; default 100) : The number you want to count up to
//  --  loopDelay (optional; default 50) : Delay in milliseconds, 1000 = 1 second
//  --  loopAmount (required) : The number of times the script will count to reach your end number

//* const counter = new IXCX_CountUp({  
//*     target: myTargetElement,  
//*     end: 35032,  
//*     loopDelay: 50,  
//*     loopAmount: 20,  
//*  });

// step 3: Call start() method or bind it to an event
//*  counter.start();
// todo

class CountUp {
    constructor(objectData = { target: null, end: null, loopAmount: null, loopDelay: null, }) {
        this.target = objectData.target;
        this.end = objectData.end;
        this.loopAmount = objectData.loopAmount;
        this.loopDelay = objectData.loopDelay;
    }

    start() {
        const chunk = (this.end ? this.end : 100) / this.loopAmount;
        let startAtZero = 0;
        let counter = 0;

        if (!this.target) {
            console.log('No target element!');
        } else {
            setInterval(() => {
                if (counter < this.loopAmount) {
                    counter++;
                    this.target.innerHTML = Math.ceil(startAtZero += chunk).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            }, this.loopDelay ? this.loopDelay : 50);
        }
    }
}

//! ----------------------------------------------------------------------------------------------
//! ----------------------------------------------------------------------------------------------

// inViewport - https://github.com/indexcodex/inviewport
// --  run a user defined funCtion when the target element is in viewport

// todo
// step 1: Create an InViewport object
//* const inViewport = new InViewport({})

// step 2: Fill in the following data:
//  --  target (required) : Your target element via getElementById, querySelector, etc..
//  --  callback (required; data type function) : The function to run when target is in viewport
//  --  offsetTrigger (optional; default: full screen height; data type: string) : trigger callback by screen height minus X pixels(px)/percent(%)
//  --  debugMode (optional; default: false; data type: boolean) : shows a visual debugger to help determine the callback trigger point

//* let h1 = document.querySelector('h1');

//* function inViewportCallback() {
//*   h1.style.color = 'red';
//* }

//* let inViewport = new InViewport({
//*   target: h1,
//*   callback: inViewportCallback,
//*   offsetTrigger: '50%',
//*   debugMode: 1,
//* });

// step 3: Call start() method
//* inViewport.start();

// todo

class InViewport {
    constructor(objectData = { target: null, callback: null, offsetTrigger: null, debugMode: false }) {
        this.target = objectData.target;
        this.callback = objectData.callback;
        this.innerHeight = window.innerHeight;
        this.innerHeight_half = window.innerHeight / 2;
        this.offsetTriggerStr = objectData.offsetTrigger;

        if (!objectData.offsetTrigger) {
            this.offsetTriggerInt = innerHeight;
        } else if (/\dpx$/.test(this.offsetTriggerStr) == true) {
            this.offsetTriggerInt = innerHeight - parseInt(objectData.offsetTrigger.replace('px', ''))
        } else if (/\d%$/.test(this.offsetTriggerStr) == true) {
            this.offsetTriggerInt = innerHeight * (parseInt(objectData.offsetTrigger.replace('%', '')) / 100)
        } else {
            this.offsetTriggerInt = innerHeight;
        }

        // DEBUG
        this.debugMode = objectData.debugMode;
        this.debugElem = document.createElement('debug');
        this.txtNode = document.createTextNode('Callback Activated');

        if (this.debugMode == true || this.debugMode == 1) {
            let body = document.body;
            this.debugElem.setAttribute('style', 'background: rgba(255, 0, 0, 0.5); width: 100%; height: ' + this.offsetTriggerInt + 'px; position: fixed; top: 0; left: 0; font-family: sans-serif; font-size: 20px; display: flex; justify-content: center; align-items: center;');
            body.appendChild(this.debugElem);
        }
    }
    start() {
        let isInViewport = () => {
            if (this.target) {
                let target = this.target.getBoundingClientRect();
                let targetPosition = target.top;

                if (targetPosition <= (this.offsetTriggerInt ? this.offsetTriggerInt : this.innerHeight)) {
                    this.callback();

                    if (this.debugMode == true || this.debugMode == 1) {
                        console.log('Callback Activated');
                        this.debugElem.appendChild(this.txtNode);
                    }

                    this.target = null;
                    target = null;
                    targetPosition = null;
                }
            }
        }
        document.addEventListener('scroll', isInViewport);
    }
}

//! ----------------------------------------------------------------------------------------------
//! ----------------------------------------------------------------------------------------------

// GET COOKIE VALUE - https://github.com/indexcodex/getCookie, https://www.w3schools.com/js/js_cookies.asp
//  --  get cookie value by supplying the cookie name
//  --  just feed the cookie name as parameter and it will output the cookie value

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}