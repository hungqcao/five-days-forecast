namespace HungCao.Apps {
    'use strict';
    
    export class DailyForecastData extends ForecastData {
        public temperatureMin: number;
        public temperatureMinTime: number;
        public dateTempMinTime: Date;
        public temperatureMax: number;
        public temperatureMaxTime: number;
        public dateTempMaxTime: Date;

        public constructor(){
            super();
            this.temperatureMin = null;
            this.temperatureMinTime = null;
            this.temperatureMax = null;
            this.temperatureMaxTime = null;
        }

        public convertMaxMinTime = () => {
            if(this.temperatureMinTime){
                var date = new Date(this.temperatureMinTime * 1000);
                this.dateTempMinTime = date;
            }
            if(this.temperatureMaxTime){
                var date = new Date(this.temperatureMaxTime * 1000);
                this.dateTempMaxTime = date;
            }
        }
    }
}