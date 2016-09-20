namespace HungCao.Apps {
    'use strict';

    export class UtilitiesService {

        static $inject = [];

        constructor() { }
        public convertToWeekDay = (date: Date): string => {
            var weekday = new Array(7);
            weekday[0] = "Monday";
            weekday[1] = "Tuesday";
            weekday[2] = "Wednesday";
            weekday[3] = "Thursday";
            weekday[4] = "Friday";
            weekday[5] = "Saturday";
            weekday[6] = "Sunday";
            if (date.getDay() === 0)
                return "Sunday";
            return weekday[date.getDay() - 1];
        }

        public convertToMonthDay = (date: Date): string => {
            var monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct",
            "Nov", "Dec"
            ];

            var day = date.getDate();
            var monthIndex = date.getMonth();
            return monthNames[monthIndex] + ' ' + day;
        }
    }

    angular.module('components').service('utilitiesService', UtilitiesService);
}