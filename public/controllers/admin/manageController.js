admin.constant("moviesUrl","http://localhost:2403/movies/")
    .constant("usersUrl","http://localhost:2403/users/")
    .constant("seatUrl","http://localhost:2403/seat/")
    .constant("playMovieUrl","http://localhost:2403/playmovie/")
    .config(function($httpProvider){
        $httpProvider.defaults.widthCredentials = true;
    })
    //���ò˵�
    .controller("manageListCtrl",function($scope,currentuser){
        $scope.listMenu = ["��Ӱ","�û�","��Ӱ��","��Ӱ����"];
        $scope.currentMenu = $scope.listMenu[0];
        $scope.setScreen = function(index){
            $scope.currentMenu = $scope.listMenu[index];
        };
        $scope.getScreen = function(){
            if( $scope.currentMenu == "��Ӱ"){
                return "/views/admin/adminManageMovie.html";
            }else if( $scope.currentMenu == "�û�"){
                return "/views/admin/adminManageUser.html";
            }else if( $scope.currentMenu == "��Ӱ����"){
                return "/views/admin/adminManagePlayMovie.html";
            }else if( $scope.currentMenu == "��Ӱ��"){
                return "/views/admin/adminManageSeat.html";
            }
        }
    })
    //�����Ӱ�Ŀ�����
    .controller("manageMovieCtrl",function($scope,$http,$resource,$timeout,moviesUrl){
        $scope.repeat = false;
        $scope.moviesResource = $resource(moviesUrl,+":id",{id:"@id"});
        $scope.movieData = [];
        //��ȡ���е�Ӱ
        $scope.listMovies = function(){
            $scope.movies = $scope.moviesResource.query();
        };
        //����һ����Ӱ
        $scope.createMovie = function(movie){
            //��֤�����ظ���
            $http.get(moviesUrl).success(function(data){
                $scope.movieData = data;
                for(var i = 0;i < $scope.movieData.length; i++){
                    if(movie.mid == $scope.movieData[i].mid){
                        $scope.repeat = true;
                        break;
                    }else{
                        $scope.repeat = false;
                    }
                }
                console.log($scope.repeat);
                if(!$scope.repeat){
                    new $scope.moviesResource(movie).$save().then(function(movie){
                        $scope.movies.push(movie);
                        $scope.editedMovie = null;
                    });
                }else{
                    alert("id �ظ�");
                }
            });
        };
        //ɾ��һ����Ӱ
        $scope.deleteMovie = function(movie){
            if(confirm("ȷ��ɾ����?")){
                var deleteUrl = "http://localhost:2403/movies/" + movie.id;
                $http.delete(deleteUrl).then(function(){
                    $scope.movies.splice($scope.movies.indexOf(movie),1);
                })
            }
        };
        //����һ����Ӱ����Ϣ
        $scope.updateMovie = function(movie){
            $http.get(moviesUrl).success(function(data){
                $scope.movieData = data;
                for(var i = 0;i < $scope.movieData.length; i++){
                    if(movie.mid == $scope.movieData[i].mid && movie.id != $scope.movieData[i].id){
                        $scope.repeat = true;
                        break;
                    }else{
                        $scope.repeat = false;
                    }
                }
                console.log($scope.repeat);
                if(!$scope.repeat){
                    movie.$save();
                    $scope.editedMovie = null;
                }else{
                    alert("id �ظ�");
                }
            });
        };
        //��ʼ�༭
        $scope.startEdit = function(movie){
            $scope.editedMovie = movie;
        };
        //ȡ���༭
        $scope.cancelEdit = function(){
            $scope.editedMovie = null;
        };
        //ֱ��ִ���г����еĵ�Ӱ
        $scope.listMovies();
    })
    //�����û��Ŀ�����
    .controller("manageUserCtrl",function($scope,$http,$resource,usersUrl){
        $scope.userrepeat = false;
        $scope.userResource = $resource(usersUrl,+":id",{id:"@id"});
        $scope.userData = [];
        //��ȡ�����û�
        $scope.listUsers = function(){
            $scope.users = $scope.userResource.query();
        };
        //����һ���û�
        $scope.createUser = function(user){
            //��֤�����ظ���
            $http.get(usersUrl).success(function(data){
                $scope.userData = data;
                for(var i = 0;i < $scope.userData.length; i++){
                    if(user.uid == $scope.userData[i].uid){
                        $scope.userrepeat = true;
                        break;
                    }else{
                        $scope.userrepeat = false;
                    }
                }
                if(!$scope.userrepeat){
                    new $scope.userResource(user).$save().then(function(user){
                        $scope.users.push(user);
                        $scope.editedUser = null;
                    });
                }else{
                    alert("id �ظ�");
                }
            });
        };
        //ɾ��һ���û�
        $scope.deleteUser = function(user){
            if(confirm("ȷ��ɾ����?")){
                var deleteUrl = "http://localhost:2403/users/" + user.id;
                $http.delete(deleteUrl).then(function(){
                    $scope.users.splice($scope.users.indexOf(user),1);
                })
            }
        };
        //����һ���û�����Ϣ
        $scope.updateUser = function(user){
            $http.get(usersUrl).success(function(data){
                $scope.userData = data;
                for(var i = 0;i < $scope.userData.length; i++){
                    if(user.uid == $scope.userData[i].uid){
                        $scope.userrepeat = true;
                        break;
                    }else{
                        $scope.userrepeat = false;
                    }
                }
                if(!$scope.userrepeat){
                    user.$save();
                    $scope.editedUser = null;
                }else{
                    alert("id �ظ�");
                }
            });
        };
        //��ʼ�༭
        $scope.startEdit = function(user){
            $scope.editedUser = user;
        };
        //ȡ���༭
        $scope.cancelEdit = function(){
            $scope.editedUser = null;
        };
        //ֱ��ִ���г����е��û�
        $scope.listUsers();
    })
    //�����Ӱ���Ŀ�����
    .controller("manageSeatCtrl",function($scope,$http,$resource,seatUrl){
        $scope.seatrepeat = false;
        $scope.seatResource = $resource(seatUrl,+":id",{id:"@id"});
        $scope.seatData = [];
        //��ȡ���е�Ӱ��
        $scope.listSeats = function(){
            $scope.seats = $scope.seatResource.query();
        };
        $scope.checkData = function(id){
            //��֤�����ظ���

        };
        //����һ����Ӱ��
        $scope.createSeat = function(seat){
            $http.get(seatUrl).success(function(data){
                $scope.seatData = data;
                for(var i = 0;i < $scope.seatData.length; i++){
                    if(seat.tid == $scope.seatData[i].tid){
                        $scope.seatrepeat = true;
                        break;
                    }else{
                        $scope.seatrepeat = false;
                    }
                }
                if(!$scope.seatrepeat){
                    new $scope.seatResource(seat).$save().then(function(seat){
                        $scope.seats.push(seat);
                        $scope.editedSeat = null;
                    });
                }else{
                    alert("id �ظ�");
                }
            })
        };
        //ɾ��һ����Ӱ��
        $scope.deleteSeat = function(seat){
            if(confirm("ȷ��ɾ����?")){
                var deleteUrl = "http://localhost:2403/seat/" + seat.id;
                $http.delete(deleteUrl).then(function(){
                    $scope.seats.splice($scope.seats.indexOf(seat),1);
                })
            }
        };
        //����һ����Ӱ������Ϣ
        $scope.updateSeat = function(seat){
            $http.get(seatUrl).success(function(data) {
                $scope.seatData = data;
                for (var i = 0; i < $scope.seatData.length; i++) {
                    if (seat.tid == $scope.seatData[i].tid) {
                        $scope.seatrepeat = true;
                        break;
                    } else {
                        $scope.seatrepeat = false;
                    }
                }
                if(!$scope.seatrepeat){
                    seat.$save();
                    $scope.editedSeat = null;
                }else{
                    alert("id �ظ�");
                }
            });
        };
        //��ʼ�༭
        $scope.startEdit = function(seat){
            $scope.editedSeat = seat;
        };
        //ȡ���༭
        $scope.cancelEdit = function(){
            $scope.editedSeat = null;
        };
        //ֱ��ִ���г����еĵ�Ӱ��
        $scope.listSeats();
    })
    .controller("managePlayMovieCtrl",function($scope,$http,$resource,playMovieUrl){
        $scope.playMovierepeat = false;
        $scope.playMovieResource = $resource(playMovieUrl,+":id",{id:"@id"});
        $scope.playMovieData = [];
        //��ȡ���е�Ӱ������Ϣ
        $scope.listPlayMovies = function(){
            $scope.playMovies = $scope.playMovieResource.query();
        };
        //����һ����Ӱ����ʱ��
        $scope.createPlayMovie = function(playMovie){
            $http.get(playMovieUrl).success(function(data){
                $scope.playMovieData = data;
                for(var i = 0;i < $scope.playMovieData.length; i++){
                    if(playMovie.fid == $scope.playMovieData[i].fid){
                        $scope.playMovierepeat = true;
                        break;
                    }else{
                        $scope.playMovierepeat = false;
                    }
                }
                if(!$scope.playMovierepeat){
                    new $scope.playMovieResource(playMovie).$save().then(function(playMovie){
                        $scope.playMovies.push(playMovie);
                        $scope.editedPlayMovie = null;
                    });
                }else{
                    alert("id �ظ�");
                }
            })
        };
        //ɾ��һ����Ӱ����ʱ��
        $scope.deletePlayMovie = function(playMovie){
            if(confirm("ȷ��ɾ����?")){
                var deleteUrl = "http://localhost:2403/playmovie/" + playMovie.id;
                $http.delete(deleteUrl).then(function(){
                    $scope.playMovies.splice($scope.playMovies.indexOf(playMovie),1);
                })
            }
        };
        //����һ����Ӱ�Ĳ���ʱ��
        $scope.updatePlayMovie = function(playMovie){
            $http.get(playMovieUrl).success(function(playMovie) {
                $scope.playMovieData = data;
                for (var i = 0; i < $scope.playMovieData.length; i++) {
                    if (playMovie.fid == $scope.playMovieData[i].fid) {
                        $scope.playMovierepeat = true;
                        break;
                    } else {
                        $scope.playMovierepeat = false;
                    }
                }
                if(!$scope.playMovierepeat){
                    playMovie.$save();
                    $scope.editedPlayMovie = null;
                }else{
                    alert("id �ظ�");
                }
            });
        };
        //��ʼ�༭
        $scope.startEdit = function(playMovie){
            $scope.editedPlayMovie = playMovie;
        };
        //ȡ���༭
        $scope.cancelEdit = function(){
            $scope.editedPlayMovie = null;
        };
        //ֱ��ִ���г����еĵ�Ӱ�����б�
        $scope.listPlayMovies();
    })