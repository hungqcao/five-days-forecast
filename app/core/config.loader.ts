namespace HungCao.Apps {
    'use strict';
    
    //This class will load configuration settings
    export class ConfigLoader {
        private apiService:ApiService;
        private forecastApiService: ForecastApiService;
        private onLoadCompleted;

        static $inject = ['apiService', 'forecastApiService'];

        constructor(apiService:ApiService, forecastApiService: ForecastApiService) {
            this.apiService = apiService;
            this.forecastApiService = forecastApiService;
        }

        importConfig(onLoadCompleted) {
            this.onLoadCompleted = onLoadCompleted;
            this.apiService.getLocal('configuration/app.config.json').then(this.onSuccess, this.onError);
        }

        private onSuccess = (response:any):void => {
            this.forecastApiService.apiUrl = response.data.apiHost;
            this.forecastApiService.apiKey = response.data.apiKey;
            this.onLoadCompleted(true);
        }

        private onError = (response:any):void => {

            this.onLoadCompleted(false);
        }
    }

    angular.module('app').service('configLoader', ConfigLoader);
}