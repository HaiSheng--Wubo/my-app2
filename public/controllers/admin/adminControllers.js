admin
    .constant("userUrl","http://localhost:2403/users")
    .controller("LoginController",function($scope,$http,$location,userUrl,currentuser){
        $scope.users = [];
        $scope.CheckUser = function(user,passwd) {
            $http.get(userUrl).success(function (data){
                $scope.users = data;
                for(var i = 0; i < $scope.users.length; i++){
                    if($scope.users[i].username == user && $scope.users[i].password == passwd){
                        if($scope.users[i].permission == "1"){
                            $location.path("/manage");
                        }else if($scope.users[i].permission == "2"){
                            alert("非管理员用户无法登陆！")
                        }
                        cuser = null;
                        currentuser.adduser($scope.users[i].name,$scope.users[i].permission);
                        return;
                    }
                }
                alert("登录名或者密码错误！");
            });
        }
    })
    //获取当前登陆的用户，控制界面的显示，让系统更安全
    .factory("currentuser",function(){
        return {
            adduser:function(name,permission){
                var text;
                if(permission == "1"){
                    text = "管理员";
                }else{
                    text = "普通用户";
                }
                if(name != ""){
                    cuser.push({
                        name:name,text:text
                    });
                }
            },
            getuser:function(){
                return cuser;
            }
        }
    })