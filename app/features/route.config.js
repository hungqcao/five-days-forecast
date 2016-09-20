var Microsoft;
(function (Microsoft) {
    var Store;
    (function (Store) {
        var FeaturesConfig = (function () {
            function FeaturesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
                var _this = this;
                this.configureRoutes = function () {
                    _this.registerState('forecast', '/forecast', 'templates/features/five-days-forecast/forecast.html', HungCao.Apps.ForecastController);
                    _this.registerDefault('forecast');
                };
                this.registerState = function (name, url, templateUrl, controller) {
                    var options = {
                        url: url,
                        templateUrl: templateUrl,
                        controller: controller,
                        controllerAs: 'vm',
                        reloadOnSearch: false,
                        requireADLogin: true
                    };
                    _this.$stateProvider.state(name, options);
                };
                this.registerDefault = function (route) {
                    _this.$urlRouterProvider.otherwise(route);
                };
                this.$stateProvider = $stateProvider;
                this.$urlRouterProvider = $urlRouterProvider;
                this.configureRoutes();
                $locationProvider.html5Mode({
                    enabled: true,
                    requireBase: true
                }).hashPrefix('!');
            }
            FeaturesConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
            return FeaturesConfig;
        }());
        angular.module('features').config(FeaturesConfig);
    })(Store = Microsoft.Store || (Microsoft.Store = {}));
})(Microsoft || (Microsoft = {}));
