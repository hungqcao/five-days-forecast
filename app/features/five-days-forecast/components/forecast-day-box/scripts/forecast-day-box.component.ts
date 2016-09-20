namespace HungCao.Apps {
    'use strict';

    import ComponentOptions = angular.IComponentOptions;

    declare var bootbox;

    export class ForecastDaybox {
        private model: DailyForecastData;

        //displaying part
        private currentWeekDayString;
        private currentMonthDayString;
        private displayMaxTemp;
        private displayMinTemp;
        private displayMaxTime;
        private displayMinTime;
        private displayHumidity;

        static $inject = ['utilitiesService'];
        constructor(private utilitiesService: UtilitiesService) {
            console.log(this.model);
            this.utilitiesService = utilitiesService;
            this.currentWeekDayString = this.utilitiesService.convertToWeekDay(this.model.dateCurrentTime);
            this.currentMonthDayString = this.utilitiesService.convertToMonthDay(this.model.dateCurrentTime);
            this.displayMaxTemp = this.model.temperatureMax;
            this.displayMinTemp = this.model.temperatureMin;
            this.displayMaxTime = this.model.dateTempMaxTime.getHours();
            this.displayMinTime = this.model.dateTempMinTime.getHours();
            this.displayHumidity = Math.round(this.model.humidity * 100);
        }
    }

    export class ForecastDayboxComponentOptions implements ComponentOptions {
        controller = ForecastDaybox;
        controllerAs = 'vm';

        bindings: any = {
            model: '<'
        };

        templateUrl = '';
    }

    var options: ForecastDayboxComponentOptions = new ForecastDayboxComponentOptions();
    options.templateUrl = 'templates/features/five-days-forecast/components/forecast-day-box/templates/forecast-day-box.html';

    angular.module('forecast').component('forecastDayBox', options);
}