'use strict';

app
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/index',{
                templateUrl:'../../view/titres.html',
                controller:'titlesController as titreCtrl',
                resolve: {
                    loadedQcmList: ['$http','sharedData', function($http, sharedData){
                        return $http.get("./rest/QCMList").then(function(response){
                            sharedData.store('qcmTable',response.data);
                            return sharedData.get('qcmTable');

                        })
                    } ]
                }
            })
            .when('/qcm/:qcmId/numq/:questionId',{
                templateUrl:'../../view/questions.html',
                controller:'questionController as QuesCtrl',
                resolve: {
                    loadedQues: ['$http','sharedData','$route', function($http, sharedData, $route){
                        return $http.get("./rest/QCMList/"+$route.current.params.qcmId+"/QuesList/"+$route.current.params.questionId).then(function(response){
                            var actualQuestion = response.data;
                            sharedData.store('actualQuestion',actualQuestion);
                            return sharedData.get('actualQuestion');

                        })
                    } ]
                }

            })
            .when('/inscription/:qcmId',{
                templateUrl:'../../view/inscription.html',
                controller:'inscriptionController as InsCtrl',
                resolve: {
                    loadedQcm: ['$http','sharedData','$route', function($http, sharedData, $route){

                        return $http.get("./rest/QCMList/"+$route.current.params.qcmId).then(function(response){
                            var actualQcm = response.data;
                            sharedData.store('actualQcm',actualQcm);
                            return sharedData.get('actualQcm');

                        })
                    } ]
                }

            })
            .when('/qcm/:qcmId/score',{
                templateUrl:'../../view/scores.html',
                controller:'scoreController as scoreCtrl'

            })
            .when('/login',{
                templateUrl:'../../view/login.html',
                controller:'loginController as logCtrl'

            })
            .when('/edit/index',{
                templateUrl:'../../view/titresEdit.html',
                controller:'titlesEditController as titleEditCtrl',
                resolve: {
                    loadedQcmList: ['$http','sharedData', function($http, sharedData){
                        return $http.get("./rest/QCMList").then(function(response){
                            sharedData.store('qcmTable',response.data);
                            return sharedData.get('qcmTable');

                        })
                    } ]
                }
            })
            .when('/edit/qcm/:qcmId',{
                templateUrl:'../../view/questionsEdit.html',
                controller: 'questionsEditController as questionEditCtrl',
                resolve: {
                    loadedQcm: ['$http','sharedData','$route', function($http, sharedData, $route){

                        return $http.get("./rest/QCMList/"+$route.current.params.qcmId).then(function(response){
                            var actualQcm = response.data;
                            sharedData.store('actualQcm',actualQcm);
                            return sharedData.get('actualQcm');

                        })
                    } ]
                }
            })
            .when('/edit/qcm/:qcmId/question/:questionId',{
                templateUrl : '../../view/answersEdit.html',
                controller : "answersEditController as answerEditCtrl",
                resolve: {
                    loadedQues: ['$http','sharedData','$route', function($http, sharedData, $route){
                        return $http.get("./rest/QCMList/"+$route.current.params.qcmId+"/QuesListComplete/"+$route.current.params.questionId).then(function(response){
                            var actualQuestion = response.data;
                            sharedData.store('actualQuestion',actualQuestion);
                            return sharedData.get('actualQuestion');

                        })
                    } ]
                }
            })
            .otherwise({redirectTo:'/index'});
    }])