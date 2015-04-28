app
    .factory('QuesFactory', ['$resource', function($resource){
        return $resource('/rest/QCMList/:qcmId/QuesList/:questionId',
            {qcmId:"@qcmId", questionId:"@questionId"}
        );

    }])
