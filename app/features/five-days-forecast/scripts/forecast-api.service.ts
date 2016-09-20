namespace HungCao.Apps {
    'use strict';

    declare var bootbox;

    export class ForecastApiService implements  IForecastApi {
        public apiUrl: string;
        public apiKey: string;

        static $inject = ['$q', 'apiService'];

        constructor(private $q, private apiService: ApiService) {
        }

        get = (lat: string, lon: string): any => {
            var apiPath = this.apiUrl + this.apiKey + "/" + lat + "," + lon;
            //Because of CORS issue we will not call api directly
            //return this.apiService.getWithQueryParams(apiPath, null);
            return this.apiService.getLocal('configuration/data.json');
        }
    }

    angular.module('forecast').service('forecastApiService', ForecastApiService);
}