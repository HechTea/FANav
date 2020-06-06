// ==UserScript==
// @name         Furaffinity Newer, Older Nav
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Navigate through pages in FurAffinity with keyboard
// @author       HechTea
// @match        https://www.furaffinity.net/view/*
// @match        http://www.furaffinity.net/view/*
// @match        https://www.furaffinity.net/full/*
// @match        http://www.furaffinity.net/full/*
// @updateURL    https://raw.githubusercontent.com/HechTea/FANav/master/FANav.js
// @grant        none
// ==/UserScript==


(function() {
    'use strict';


    function Delay(t) {
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                resolve();
            }, t);
        });
    }
    // TODO
    class SmoothSlide {
        constructor() {
            this.keyState = {UP: false, DOWN: false, LEFT: false, RIGHT: false};
            this.isSliding = false;
            this.updateInterval = 50; // ms
            this._timeTilMaxSpeed = 500; // ms
            this.horizontalMaxSpeed = 200;
            this.verticalMaxSpeed = 200;
            this._baseHorizontalAcc = this.horizontalMaxSpeed * (this._timeTilMaxSpeed / this.updateInterval);
            this._baseVerticalAcc = this.verticalMaxSpeed * (this._timeTilMaxSpeed / this.updateInterval);
            this._baseHorizontalDecel = this._baseHorizontalAcc * 4;
            this._baseVerticalDecel = this._baseVerticalAcc * 4;
            this.horizontalAcc = 0;
            this.verticalAcc = 0;
            this.horizontalSpeed = 0;
            this.verticalSpeed = 0;

            this.horizontalIntervalHandler = null;
            this.verticalIntervalHandler = null;
            console.log("Smooooth");
        }

        processKeyDown(key) {
            switch(key) {
                case '8':
                    this.keyState.UP = true;
                    if (this.horizontalIntervalHandler == null) {
                        this.__verticalHandler();
                    }
                    break;
                case '5':
                    this.keyState.DOWN = true;
                    if (this.verticalIntervalHandler == null) {
                        this.__verticalHandler();
                    }
                    break;
            }
        }
        processKeyUp(key) {
            switch(key) {
                case '8':
                    this.keyState.UP = true;
                    if (this.horizontalIntervalHandler == null) {
                        this.__slideUp();
                    }
                    break;
                case '5':
                    this.keyState.DOWN = true;
                    if (this.verticalIntervalHandler == null) {
                        this.__slideDown();
                    }
                    break;
            }
        }

        get __get_verticalSpeed() { return this.verticalSpeed; }
        set __set_verticalSpeed(v) {
            console.log("Original vertical speed:", this.verticalSpeed);
            this.verticalSpeed = v;
        }
        __verticalHandler() {
            var getSpeed = this.__get_verticalSpeed;
            var setSpeed = this.__set_verticalSpeed;
            //var acceleration = __get_verticalAcc;
            // check key state
            if (this.keyState.UP == true && this.keyStateDOWN == false) {
            // 1. only UP
                if (getSpeed() < 0) {
                // a. along the direction
                    var tmpSpeed = getSpeed() + 0; ////////////////////////////// TODO: acc

                }
            } else if (1) {
            // 2. only DOWN

            } else if (1) {
            // 3. both UP & DOWN

            } else {
            // 4. neither UP nor DOWN

            }

            // check if already sliding VERTICALLY
            // 1. is sliding up
            //   accelerate, or maintain
            // 2. is sliding down
        }

    };


    var newerPageUrl;
    var olderPageUrl;
    var slideManager = new SmoothSlide();

    function GotoUrl(url) {
        var a = document.createElement("a");
        a.href = url;
        a.click();
    }
    function Newer() {
        console.log(newerPageUrl);
        //location.replace(newerPageUrl);
        GotoUrl(newerPageUrl);
    }
    function Older() {
        console.log(olderPageUrl);
        //location.replace(olderPageUrl);
        GotoUrl(olderPageUrl);
    }
    function ScrollUp() {
        window.scrollBy(0, -300);
    }
    function ScrollDown() {
        window.scrollBy(0, 300);
    }
    function ScrollLeft() {
        window.scrollBy(-300, 0);
    }
    function ScrollRight() {
        window.scrollBy(300, 0);
    }

    document.body.onkeypress = function(e) {
        console.log(e);
        switch (e.key) {
            case "n":
            case "7":
                Newer();
                break;
            case "p":
            case "9":
                Older();
                break;
        }
    }

    document.body.onkeydown = function(e) {
        console.log(e);
        switch (e.key) {
            case "i":
            case "8":
                ScrollUp();
                break;
            case "k":
            case "5":
                ScrollDown();
                break;
            case "j":
            case "4":
                ScrollLeft();
                break;
            case "l":
            case "6":
                ScrollRight();
                break;
        }
    }

    try { newerPageUrl = document.querySelector(".next.button-link").href; } catch(e) {newerPageUrl = "#"};
    try { olderPageUrl = document.querySelector(".prev.button-link").href; } catch(e) {olderPageUrl = "#"};

})();
