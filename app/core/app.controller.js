var HungCao;
(function (HungCao) {
    var Apps;
    (function (Apps) {
        'use strict';
        var AppController = (function () {
            function AppController(configLoader) {
                var _this = this;
                this.loadConfig = function () {
                    _this.loader.importConfig(_this.onLoadCompleted);
                };
                this.onLoadCompleted = function (success) {
                    if (success) {
                        _this.loaded = true;
                    }
                    else {
                        console.error('Unable to load configuration');
                    }
                };
                this.loader = configLoader;
                this.loadConfig();
            }
            AppController.$inject = ['configLoader'];
            return AppController;
        }());
        angular.module('app').controller('AppController', AppController);
    })(Apps = HungCao.Apps || (HungCao.Apps = {}));
})(HungCao || (HungCao = {}));
