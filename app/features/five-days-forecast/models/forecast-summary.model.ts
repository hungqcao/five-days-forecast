namespace HungCao.Apps {
    'use strict';
    
    export class DailySummary {
        public summary: string;
        public icon: string;
        public data: DailyForecastData[];

        public constructor() {
            this.data = new Array<DailyForecastData>();
        }
    }
}