var HungCao;
(function (HungCao) {
    var Apps;
    (function (Apps) {
        'use strict';
        var ForecastApiService = (function () {
            function ForecastApiService($q, apiService) {
                var _this = this;
                this.$q = $q;
                this.apiService = apiService;
                this.get = function (lat, lon) {
                    var apiPath = _this.apiUrl + _this.apiKey + "/" + lat + "," + lon;
                    //Because of CORS issue we will not call api directly
                    //return this.apiService.getWithQueryParams(apiPath, null);
                    return _this.apiService.getLocal('configuration/data.json');
                };
            }
            ForecastApiService.$inject = ['$q', 'apiService'];
            return ForecastApiService;
        }());
        Apps.ForecastApiService = ForecastApiService;
        angular.module('forecast').service('forecastApiService', ForecastApiService);
    })(Apps = HungCao.Apps || (HungCao.Apps = {}));
})(HungCao || (HungCao = {}));
