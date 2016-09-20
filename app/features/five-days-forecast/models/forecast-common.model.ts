namespace HungCao.Apps {
    'use strict';

    interface JsonSerializable{
        loadFromJson(data:any);
    }
    
    export class ForecastData implements JsonSerializable{
        public summary: string;
        public icon: string;
        public temperature: number;
        public humidity: number;
        public windSpeed: number;
        public dewPoint: number;
        public time: number;
        public dateCurrentTime: Date;

        constructor () {
            //default value
            this.summary = null;
            this.icon = null;
            this.temperature = null;
            this.humidity = null;
            this.windSpeed = null;
            this.dewPoint = null;
            this.time = null;
        } 

        public loadFromJson = (data: any) => {
            for(var property in this){
                if(typeof this[property] !== "function"){
                    this[property] = data[property];
                }
            }
        }

        public convertCurrentTime = () => {
            if(this.time){
                var date = new Date(this.time * 1000);
                this.dateCurrentTime = date;
            }
        }
    }
}