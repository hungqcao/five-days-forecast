namespace HungCao.Apps {
    'use strict';

    export class ApiService {

        static $inject = ['$q', '$http', '$location'];

        constructor(private $q, private $http, private $location) {

        }
        
        getWithQueryParams(apiPath: string, params: any) {
            var promise = this.execute('GET', apiPath, params, this.$q.defer(), null);

            return promise;
        }

        getLocal(path: string) {
            return this.$http.get(path);
        }

        private execute(apiAction: string, api: string, args: any, deferred: any, data: any) {
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
        }
    }

    angular.module('components').service('apiService', ApiService);
}