namespace HungCao.Apps {
    export interface IForecastApi {
        get(lat: string, lon: string): any;
    }
}