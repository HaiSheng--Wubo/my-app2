admin.constant("moviesUrl","http://localhost:2403/movies/")
    .constant("usersUrl","http://localhost:2403/users/")
    .constant("seatUrl","http://localhost:2403/seat/")
    .constant("playMovieUrl","http://localhost:2403/playmovie/")
    .config(function($httpProvider){
        $httpProvider.defaults.widthCredentials = true;
    })
    //设置菜单
    .controller("manageListCtrl",function($scope,currentuser){
        $scope.listMenu = ["电影","用户","电影厅","电影排期"];
        $scope.currentMenu = $scope.listMenu[0];
        $scope.setScreen = function(index){
            $scope.currentMenu = $scope.listMenu[index];
        };
        $scope.getScreen = function(){
            if( $scope.currentMenu == "电影"){
                return "/views/admin/adminManageMovie.html";
            }else if( $scope.currentMenu == "用户"){
                return "/views/admin/adminManageUser.html";
            }else if( $scope.currentMenu == "电影排期"){
                return "/views/admin/adminManagePlayMovie.html";
            }else if( $scope.currentMenu == "电影厅"){
                return "/views/admin/adminManageSeat.html";
            }
        }
    })
    //管理电影的控制器
    .controller("manageMovieCtrl",function($scope,$http,$resource,$timeout,moviesUrl){
        $scope.repeat = false;
        $scope.moviesResource = $resource(moviesUrl,+":id",{id:"@id"});
        $scope.movieData = [];
        //获取所有电影
        $scope.listMovies = function(){
            $scope.movies = $scope.moviesResource.query();
        };
        //创建一个电影
        $scope.createMovie = function(movie){
            //验证数据重复性
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
                    alert("id 重复");
                }
            });
        };
        //删除一个电影
        $scope.deleteMovie = function(movie){
            if(confirm("确认删除吗?")){
                var deleteUrl = "http://localhost:2403/movies/" + movie.id;
                $http.delete(deleteUrl).then(function(){
                    $scope.movies.splice($scope.movies.indexOf(movie),1);
                })
            }
        };
        //更新一个电影的信息
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
                    alert("id 重复");
                }
            });
        };
        //开始编辑
        $scope.startEdit = function(movie){
            $scope.editedMovie = movie;
        };
        //取消编辑
        $scope.cancelEdit = function(){
            $scope.editedMovie = null;
        };
        //直接执行列出所有的电影
        $scope.listMovies();
    })
    //管理用户的控制器
    .controller("manageUserCtrl",function($scope,$http,$resource,usersUrl){
        $scope.userrepeat = false;
        $scope.userResource = $resource(usersUrl,+":id",{id:"@id"});
        $scope.userData = [];
        //获取所有用户
        $scope.listUsers = function(){
            $scope.users = $scope.userResource.query();
        };
        //创建一个用户
        $scope.createUser = function(user){
            //验证数据重复性
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
                    alert("id 重复");
                }
            });
        };
        //删除一个用户
        $scope.deleteUser = function(user){
            if(confirm("确认删除吗?")){
                var deleteUrl = "http://localhost:2403/users/" + user.id;
                $http.delete(deleteUrl).then(function(){
                    $scope.users.splice($scope.users.indexOf(user),1);
                })
            }
        };
        //更新一个用户的信息
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
                    alert("id 重复");
                }
            });
        };
        //开始编辑
        $scope.startEdit = function(user){
            $scope.editedUser = user;
        };
        //取消编辑
        $scope.cancelEdit = function(){
            $scope.editedUser = null;
        };
        //直接执行列出所有的用户
        $scope.listUsers();
    })
    //管理电影厅的控制器
    .controller("manageSeatCtrl",function($scope,$http,$resource,seatUrl){
        $scope.seatrepeat = false;
        $scope.seatResource = $resource(seatUrl,+":id",{id:"@id"});
        $scope.seatData = [];
        //获取所有电影厅
        $scope.listSeats = function(){
            $scope.seats = $scope.seatResource.query();
        };
        $scope.checkData = function(id){
            //验证数据重复性

        };
        //创建一个电影厅
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
                    alert("id 重复");
                }
            })
        };
        //删除一个电影厅
        $scope.deleteSeat = function(seat){
            if(confirm("确认删除吗?")){
                var deleteUrl = "http://localhost:2403/seat/" + seat.id;
                $http.delete(deleteUrl).then(function(){
                    $scope.seats.splice($scope.seats.indexOf(seat),1);
                })
            }
        };
        //更新一个电影厅的信息
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
                    alert("id 重复");
                }
            });
        };
        //开始编辑
        $scope.startEdit = function(seat){
            $scope.editedSeat = seat;
        };
        //取消编辑
        $scope.cancelEdit = function(){
            $scope.editedSeat = null;
        };
        //直接执行列出所有的电影厅
        $scope.listSeats();
    })
    .controller("managePlayMovieCtrl",function($scope,$http,$resource,playMovieUrl){
        $scope.playMovierepeat = false;
        $scope.playMovieResource = $resource(playMovieUrl,+":id",{id:"@id"});
        $scope.playMovieData = [];
        //获取所有电影播放信息
        $scope.listPlayMovies = function(){
            $scope.playMovies = $scope.playMovieResource.query();
        };
        //创建一个电影播放时段
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
                    alert("id 重复");
                }
            })
        };
        //删除一个电影播放时段
        $scope.deletePlayMovie = function(playMovie){
            if(confirm("确认删除吗?")){
                var deleteUrl = "http://localhost:2403/playmovie/" + playMovie.id;
                $http.delete(deleteUrl).then(function(){
                    $scope.playMovies.splice($scope.playMovies.indexOf(playMovie),1);
                })
            }
        };
        //更新一个电影的播放时段
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
                    alert("id 重复");
                }
            });
        };
        //开始编辑
        $scope.startEdit = function(playMovie){
            $scope.editedPlayMovie = playMovie;
        };
        //取消编辑
        $scope.cancelEdit = function(){
            $scope.editedPlayMovie = null;
        };
        //直接执行列出所有的电影播放列表
        $scope.listPlayMovies();
    })