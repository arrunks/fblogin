var app = angular.module('app', []);

app.constant('isMobile', isMobileDevice()); //window.screen.width
app.constant('isTablet', window.innerWidth >= 760 && window.innerWidth <= 1024); //window.screen.width

if (!window.console) console = {log: function() {}};

function isMobileDevice(){
    var isMobile;
    isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i) !== null;
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i) !== null;
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null;
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i) !== null;
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i) !== null;
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    return isMobile.any();
}

String.prototype.toTitleCase = function() {
    return this.replace(/\w\S*/g, function(txt) {
    	return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

if (!String.prototype.startsWith) {
	  String.prototype.startsWith = function(searchString, position) {
	    position = position || 0;
	    return this.indexOf(searchString, position) === position;
	  };
}

Array.prototype.sortByProp = function(p) {
    return this.sort(function(a,b) {
        return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
};

Array.prototype.unique = function() {
    var n = {},r=[];
    for(var i = 0; i < this.length; i++) {
        if (!n[this[i]]){
            n[this[i]] = true;
            r.push(this[i]);
        }
    }
    return r;
};

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

Array.prototype.move = function(from,to){
	  this.splice(to,0,this.splice(from,1)[0]);
	  return this;
};

Array.prototype.getIndexBy = function (name, value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][name] == value) {
            return i;
        }
    }
    return -1;
}


app.run([
     '$rootScope',  'isMobile', 'isTablet','$window','FbAuthService',
    function ( $rootScope, isMobile, isTablet,$window,FbAuthService) {
 

        
        
        
        $rootScope.fbuser = {};
        
        $window.fbAsyncInit = function() {
            // Executed when the SDK is loaded

            FB.init({

              /*
               The app id of the web app;
               To register a new app visit Facebook App Dashboard
               ( https://developers.facebook.com/apps/ )
              */

              appId: '190719234849629',

              /*
               Adding a Channel File improves the performance
               of the javascript SDK, by addressing issues
               with cross-domain communication in certain browsers.
              */

              channelUrl: 'app/channel.html',

              
              /* Set if you want to check the authentication status
               at the start up of the app*/
              

              status: true,

              /*
               Enable cookies to allow the server to access
               the session
              */

              cookie: true,

              /* Parse XFBML */

              xfbml: true,
              version: 'v2.4'
            });

            FbAuthService.watchLoginChange();
          };

          (function(d){
            // load the Facebook javascript SDK

            var js,
            id = 'facebook-jssdk',
            ref = d.getElementsByTagName('script')[0];

            if (d.getElementById(id)) {
              return;
            }

            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";

            ref.parentNode.insertBefore(js, ref);

          }(document));
    }
]);

/*app.config([
    '$routeProvider',
    '$locationProvider',
    '$controllerProvider',
    '$compileProvider',
    '$filterProvider',
    '$provide',
    'isMobile',
    'isTablet',
    function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide,isMobile, isTablet) {
    	app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        $locationProvider.html5Mode(true);
        //$locationProvider.hashPrefix('!');

 

    }
]);*/

app.service('FbAuthService',FbAuthService);
