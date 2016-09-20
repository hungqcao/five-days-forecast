namespace HungCao.Apps {
    'use strict';

    export class ForecastController {
        private dateModel: Date;
        private currently: ForecastData;
        private dailySummary: DailySummary;
        private numberOfDays: number;
        private currentWeekDayString: string;
        private currentMonthDayString: string;

        static $inject = ['forecastApiService', 'utilitiesService'];

        constructor(private forecastApiService: ForecastApiService, private utilitiesService: UtilitiesService) {
            this.forecastApiService = forecastApiService;
            this.dailySummary = new DailySummary();
            this.numberOfDays = 5;
            this.currently = new ForecastData();
            this.utilitiesService = utilitiesService;
        }

        $onInit() {
            this.dateModel = new Date();
            this.init();
        }

        private init = () => {
            this.forecastApiService.get("37.8267", "-122.423").then(this.loadCompleted, this.loadError)
        }

        private loadCompleted = (response) => {
            let data = response.data;
            if (data.currently) {
                this.currently.loadFromJson(data.currently);
                this.currently.convertCurrentTime();
                this.currentWeekDayString = this.utilitiesService.convertToWeekDay(this.currently.dateCurrentTime);
                this.currentMonthDayString = this.utilitiesService.convertToMonthDay(this.currently.dateCurrentTime);
            }
            if (data.daily) {
                this.dailySummary.summary = data.daily.summary;
                this.dailySummary.icon = data.daily.icon;
                if (data.daily.data) {
                    for (let daily in data.daily.data) {
                        if (this.dailySummary.data.length === this.numberOfDays) {
                            break;
                        }
                        let dailyObj = new DailyForecastData();
                        dailyObj.loadFromJson(data.daily.data[daily]);
                        dailyObj.convertMaxMinTime();
                        dailyObj.convertCurrentTime();
                        this.dailySummary.data.push(dailyObj);
                    }
                }
            }
        }

        private loadError = (response) => {

        }
    }

    angular.module('forecast').controller('ForecastController', ForecastController);
}