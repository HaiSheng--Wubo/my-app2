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
                            alert("�ǹ���Ա�û��޷���½��")
                        }
                        cuser = null;
                        currentuser.adduser($scope.users[i].name,$scope.users[i].permission);
                        return;
                    }
                }
                alert("��¼�������������");
            });
        }
    })
    //��ȡ��ǰ��½���û������ƽ������ʾ����ϵͳ����ȫ
    .factory("currentuser",function(){
        return {
            adduser:function(name,permission){
                var text;
                if(permission == "1"){
                    text = "����Ա";
                }else{
                    text = "��ͨ�û�";
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