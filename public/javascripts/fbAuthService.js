    function FbAuthService($rootScope,$q) {
		    this.watchLoginChange = function() {

		    	  var _self = this;

		    	  FB.Event.subscribe('auth.authResponseChange', function(res) {

		    	    if (res.status === 'connected') {

		    	      /*
		    	       The user is already logged,
		    	       is possible retrieve his personal info
		    	      */
		    	      _self.getFbUserInfo();

		    	      /*
		    	       This is also the point where you should create a
		    	       session for the current user.
		    	       For this purpose you can use the data inside the
		    	       res.authResponse object.
		    	      */

		    	    }
		    	    else {

		    	      /*
		    	       The user is not logged to the app, or into Facebook:
		    	       destroy the session on the server.
		    	      */

		    	    }

		    	  });

		    	}
		    
		    this.getFbUserInfo = function() {
		    	  var _self = this;

		    	  FB.api('/me', function(res) {
		    	    $rootScope.$apply(function() {
		    	      $rootScope.fbuser = _self.user = res;
		    	    });
		    	  });

		    	}
		    this.getProfilePictureFB = function() {
	            var deferred = $q.defer();
	            
	            	
	            	
	            FB.api('/me/picture', 'GET',{
	            	width: '480',
	            	height:'480'
	            }, function(response) {
	                if (!response || response.error) {
	                    deferred.reject('Error occured');
	                } else {
	                    deferred.resolve(response);
	                }
	            });
	            return deferred.promise;
	        }


	}
    FbAuthService.$inject=['$rootScope','$q'];
