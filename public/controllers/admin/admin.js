/**
 * Created by Administrator on 2016/1/4.
 */
var admin = angular.module("Admin",["ngRoute","ngResource"]);
admin.config(function($routeProvider){
    $routeProvider.when("/login",{
        templateUrl:"/views/admin/adminLogin.html"
    });
    $routeProvider.when("/manage",{
        templateUrl:"/views/admin/adminManage.html"
    });
    //$routeProvider.when("/movie",{
    //    templateUrl:"index.html"
    //});
    $routeProvider.otherwise({
        redirectTo:"/login"
    })
});