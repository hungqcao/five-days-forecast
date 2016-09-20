namespace Microsoft.Store {
    class FeaturesConfig {
        private $stateProvider;
        private $urlRouterProvider;

        static $inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

        constructor($stateProvider, $urlRouterProvider, $locationProvider) {
            this.$stateProvider = $stateProvider;
            this.$urlRouterProvider = $urlRouterProvider;

            this.configureRoutes();

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: true
            }).hashPrefix('!');
        }

        private configureRoutes = () => {
            this.registerState('forecast', '/forecast', 'templates/features/five-days-forecast/forecast.html', HungCao.Apps.ForecastController);

            this.registerDefault('forecast');
        }

        private registerState = (name, url, templateUrl, controller) => {
            var options = {
                url: url,
                templateUrl: templateUrl,
                controller: controller,
                controllerAs: 'vm',
                reloadOnSearch: false,
                requireADLogin: true
            };

            this.$stateProvider.state(name, options);
        }

        private registerDefault = (route) => {
            this.$urlRouterProvider.otherwise(route);
        }
    }

    angular.module('features').config(FeaturesConfig);
}
