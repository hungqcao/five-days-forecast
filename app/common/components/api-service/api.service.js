var HungCao;
(function (HungCao) {
    var Apps;
    (function (Apps) {
        'use strict';
        var ApiService = (function () {
            function ApiService($q, $http, $location) {
                this.$q = $q;
                this.$http = $http;
                this.$location = $location;
            }
            ApiService.prototype.getWithQueryParams = function (apiPath, params) {
                var promise = this.execute('GET', apiPath, params, this.$q.defer(), null);
                return promise;
            };
            ApiService.prototype.getLocal = function (path) {
                return this.$http.get(path);
            };
            ApiService.prototype.execute = function (apiAction, api, args, deferred, data) {
                var config = {
                    method: apiAction,
                    url: api,
                    data: data,
                    params: args
                };
                this.$http(config).then(function (response) {
                    deferred.resolve(response);
                }, function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            };
            ApiService.$inject = ['$q', '$http', '$location'];
            return ApiService;
        }());
        Apps.ApiService = ApiService;
        angular.module('components').service('apiService', ApiService);
    })(Apps = HungCao.Apps || (HungCao.Apps = {}));
})(HungCao || (HungCao = {}));
