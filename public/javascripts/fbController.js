app.controller('fbController', [
    '$scope', '$rootScope', '$location', '$document', '$timeout','$q','FbAuthService','$http',
    function($scope, $rootScope,$location, $document, $timeout, $q, FbAuthService,$http) {

    	$scope.fb={connected:false,profilePictureUrl:''};

        $scope.getProfilePicture = function() {
        	FB.login(function(response) {

              	 FB.getLoginStatus(function(response) {
   	    		  if(response.status === 'connected'){
   	    			  $scope.fb.connected = true;
   	    			  FbAuthService.getProfilePictureFB().then(function(response){
   	    				$scope.fb.profilePictureUrl= response.data.url
                $http.post('/upload', {'imageUrl':response.data.url,'userId':$rootScope.fbuser.id}).then(function(){
                  console.log('success');
                });

   	    	       });
   	    		  }else{
   	    			  $scope.fb.connected = false;
   	    		  }
              	 });
        		}, {scope: 'public_profile'});



        	}
    }
]);
