/**
 * Created by Administrator on 2016/1/5.
 */
var movie = angular.module("UserMovie",["ngRoute"]);
movie.config(function($routeProvider){
    $routeProvider.when("/movie",{
            templateUrl:"/views/user/movieList.html"
        }
    );
    $routeProvider.otherwise({
            templateUrl:"/views/user/login.html"
        }
    );
});
