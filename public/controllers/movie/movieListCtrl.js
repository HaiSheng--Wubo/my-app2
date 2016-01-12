/**
 * Created by Administrator on 2016/1/6.
 */
movie
    .constant("movieUrl","http://localhost:2403/movies")
    .controller("movieListCtrl",function($scope,$http,movieUrl,currentuser){
        $scope.cuser = currentuser.getUser();
        $scope.movieList = [];
        $http.get(movieUrl).success(function(data){
             $scope.movieList = data;
        });

    });