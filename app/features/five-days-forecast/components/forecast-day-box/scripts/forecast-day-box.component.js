var HungCao;
(function (HungCao) {
    var Apps;
    (function (Apps) {
        'use strict';
        var ForecastDaybox = (function () {
            function ForecastDaybox(utilitiesService) {
                this.utilitiesService = utilitiesService;
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
            ForecastDaybox.$inject = ['utilitiesService'];
            return ForecastDaybox;
        }());
        Apps.ForecastDaybox = ForecastDaybox;
        var ForecastDayboxComponentOptions = (function () {
            function ForecastDayboxComponentOptions() {
                this.controller = ForecastDaybox;
                this.controllerAs = 'vm';
                this.bindings = {
                    model: '<'
                };
                this.templateUrl = '';
            }
            return ForecastDayboxComponentOptions;
        }());
        Apps.ForecastDayboxComponentOptions = ForecastDayboxComponentOptions;
        var options = new ForecastDayboxComponentOptions();
        options.templateUrl = 'templates/features/five-days-forecast/components/forecast-day-box/templates/forecast-day-box.html';
        angular.module('forecast').component('forecastDayBox', options);
    })(Apps = HungCao.Apps || (HungCao.Apps = {}));
})(HungCao || (HungCao = {}));
