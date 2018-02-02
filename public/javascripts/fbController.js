app.controller('fbController', [
    '$scope', '$rootScope', '$location', '$document', '$timeout','$q','FbAuthService',
    function($scope, $rootScope,$location, $document, $timeout, $q, FbAuthService) {
        
        console.log("init")
    	$scope.fb={connected:false,profilePictureUrl:''};
    	
        $scope.checkLoginState = function() {
        	FB.login(function(response) {
        		   console.log(response);
        		   
              	 FB.getLoginStatus(function(response) {
   	    		  if(response.status === 'connected'){
   	    			  $scope.fb.connected = true;
   	    			  FbAuthService.getProfilePictureFB().then(function(response){
   	    				$scope.fb.profilePictureUrl= response.data.url
   	    	          });
   	    		  }else{
   	    			  $scope.fb.connected = false;
   	    		  }
              	 });
        		}, {scope: 'public_profile'});
        	
        	

        	}
    }
]);
