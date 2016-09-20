var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HungCao;
(function (HungCao) {
    var Apps;
    (function (Apps) {
        'use strict';
        var DailyForecastData = (function (_super) {
            __extends(DailyForecastData, _super);
            function DailyForecastData() {
                var _this = this;
                _super.call(this);
                this.convertMaxMinTime = function () {
                    if (_this.temperatureMinTime) {
                        var date = new Date(_this.temperatureMinTime * 1000);
                        _this.dateTempMinTime = date;
                    }
                    if (_this.temperatureMaxTime) {
                        var date = new Date(_this.temperatureMaxTime * 1000);
                        _this.dateTempMaxTime = date;
                    }
                };
                this.temperatureMin = null;
                this.temperatureMinTime = null;
                this.temperatureMax = null;
                this.temperatureMaxTime = null;
            }
            return DailyForecastData;
        }(Apps.ForecastData));
        Apps.DailyForecastData = DailyForecastData;
    })(Apps = HungCao.Apps || (HungCao.Apps = {}));
})(HungCao || (HungCao = {}));
