var HungCao;
(function (HungCao) {
    var Apps;
    (function (Apps) {
        'use strict';
        var ForecastController = (function () {
            function ForecastController(forecastApiService, utilitiesService) {
                var _this = this;
                this.forecastApiService = forecastApiService;
                this.utilitiesService = utilitiesService;
                this.init = function () {
                    _this.forecastApiService.get("37.8267", "-122.423").then(_this.loadCompleted, _this.loadError);
                };
                this.loadCompleted = function (response) {
                    var data = response.data;
                    if (data.currently) {
                        _this.currently.loadFromJson(data.currently);
                        _this.currently.convertCurrentTime();
                        _this.currentWeekDayString = _this.utilitiesService.convertToWeekDay(_this.currently.dateCurrentTime);
                        _this.currentMonthDayString = _this.utilitiesService.convertToMonthDay(_this.currently.dateCurrentTime);
                    }
                    if (data.daily) {
                        _this.dailySummary.summary = data.daily.summary;
                        _this.dailySummary.icon = data.daily.icon;
                        if (data.daily.data) {
                            for (var daily in data.daily.data) {
                                if (_this.dailySummary.data.length === _this.numberOfDays) {
                                    break;
                                }
                                var dailyObj = new Apps.DailyForecastData();
                                dailyObj.loadFromJson(data.daily.data[daily]);
                                dailyObj.convertMaxMinTime();
                                dailyObj.convertCurrentTime();
                                _this.dailySummary.data.push(dailyObj);
                            }
                        }
                    }
                };
                this.loadError = function (response) {
                };
                this.forecastApiService = forecastApiService;
                this.dailySummary = new Apps.DailySummary();
                this.numberOfDays = 5;
                this.currently = new Apps.ForecastData();
                this.utilitiesService = utilitiesService;
            }
            ForecastController.prototype.$onInit = function () {
                this.dateModel = new Date();
                this.init();
            };
            ForecastController.$inject = ['forecastApiService', 'utilitiesService'];
            return ForecastController;
        }());
        Apps.ForecastController = ForecastController;
        angular.module('forecast').controller('ForecastController', ForecastController);
    })(Apps = HungCao.Apps || (HungCao.Apps = {}));
})(HungCao || (HungCao = {}));
