var HungCao;
(function (HungCao) {
    var Apps;
    (function (Apps) {
        'use strict';
        var Configuration = (function () {
            function Configuration($httpProvider, $locationProvider) {
                $locationProvider.html5Mode(true);
            }
            Configuration.$inject = ['$httpProvider', '$locationProvider'];
            return Configuration;
        }());
        angular.module('app').config(Configuration);
    })(Apps = HungCao.Apps || (HungCao.Apps = {}));
})(HungCao || (HungCao = {}));
