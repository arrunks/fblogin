app.controller('fbController', [
    '$scope', '$rootScope', '$location', '$document', '$timeout','$q','FbAuthService','$http','$routeParams',
    function($scope, $rootScope,$location, $document, $timeout, $q, FbAuthService,$http,$routeParams) {
      $scope.leadId = $routeParams.leadId*1;
    	$scope.fb={connected:false,profilePictureUrl:''};

        $scope.getProfilePicture = function() {
        	FB.login(function(response) {

            FB.getLoginStatus(function(response) {
   	    		  if(response.status === 'connected'){
   	    			  $scope.fb.connected = true;
   	    			  FbAuthService.getProfilePictureFB().then(function(response){
   	    				$scope.fb.profilePictureUrl= response.data.url
                $http.post('/photo', {
                  'imageUrl':response.data.url,
                  'userId':$rootScope.fbuser.id,
                  'leadId':$scope.leadId
                  }).then(function(){
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
