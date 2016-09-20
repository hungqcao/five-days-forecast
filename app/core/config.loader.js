var HungCao;
(function (HungCao) {
    var Apps;
    (function (Apps) {
        'use strict';
        //This class will load configuration settings
        var ConfigLoader = (function () {
            function ConfigLoader(apiService, forecastApiService) {
                var _this = this;
                this.onSuccess = function (response) {
                    _this.forecastApiService.apiUrl = response.data.apiHost;
                    _this.forecastApiService.apiKey = response.data.apiKey;
                    _this.onLoadCompleted(true);
                };
                this.onError = function (response) {
                    _this.onLoadCompleted(false);
                };
                this.apiService = apiService;
                this.forecastApiService = forecastApiService;
            }
            ConfigLoader.prototype.importConfig = function (onLoadCompleted) {
                this.onLoadCompleted = onLoadCompleted;
                this.apiService.getLocal('configuration/app.config.json').then(this.onSuccess, this.onError);
            };
            ConfigLoader.$inject = ['apiService', 'forecastApiService'];
            return ConfigLoader;
        }());
        Apps.ConfigLoader = ConfigLoader;
        angular.module('app').service('configLoader', ConfigLoader);
    })(Apps = HungCao.Apps || (HungCao.Apps = {}));
})(HungCao || (HungCao = {}));
