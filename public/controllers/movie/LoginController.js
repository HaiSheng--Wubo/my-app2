movie.constant("userUrl","http://localhost:2403/users")
    .controller("LoginController",function($scope,$http,$location,userUrl,currentuser){
        var text;
        $scope.users = [];
        $scope.cuser = [];
        $scope.iflogin = 1;
        $scope.CheckUser = function(user,passwd) {
            $http.get(userUrl).success(function (data){
                $scope.users = data;
                for(var i = 0; i < $scope.users.length; i++){
                    if($scope.users[i].username == user && $scope.users[i].password == passwd){
                        $location.path("/movie");
                        $scope.iflogin = 1;
                        if($scope.users[i].permission == "1"){
                            text = "超级用户";
                        }else{
                            text = "普通用户";
                        }
                        currentuser.addUser($scope.users[i].name,text);
                        $scope.cuser = currentuser.getUser();
                        return;
                    }
                }
                alert("登录名或者密码错误！");
            });
        }
    })
    //获取当前登陆的用户，控制界面的显示，让系统更安全
    .factory("currentuser",function($http){
        return {
            addUser:function(name,text){
                $http.post("http://localhost:2403/currentuser",{"name":name,"text":text});
            },
            getUser:function(){
               $http.get("http://localhost:2403/currentuser").success(function(data){
                    return data[0];
               })
            }
        }
    });