app
.factory('QcmFactory',['$resource',function($resource){
        return $resource('../rest/QCMList/:qcmId',
            {qcmId:"@qcmId"}
        );

    }])
