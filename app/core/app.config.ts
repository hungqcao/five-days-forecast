namespace HungCao.Apps {
    'use strict';

    class Configuration {
        static $inject = ['$httpProvider', '$locationProvider'];

        constructor($httpProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
        }
    }

    angular.module('app').config(Configuration);
}