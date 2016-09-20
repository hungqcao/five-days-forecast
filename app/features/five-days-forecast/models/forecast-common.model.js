var HungCao;
(function (HungCao) {
    var Apps;
    (function (Apps) {
        'use strict';
        var ForecastData = (function () {
            function ForecastData() {
                var _this = this;
                this.loadFromJson = function (data) {
                    for (var property in _this) {
                        if (typeof _this[property] !== "function") {
                            _this[property] = data[property];
                        }
                    }
                };
                this.convertCurrentTime = function () {
                    if (_this.time) {
                        var date = new Date(_this.time * 1000);
                        _this.dateCurrentTime = date;
                    }
                };
                //default value
                this.summary = null;
                this.icon = null;
                this.temperature = null;
                this.humidity = null;
                this.windSpeed = null;
                this.dewPoint = null;
                this.time = null;
            }
            return ForecastData;
        }());
        Apps.ForecastData = ForecastData;
    })(Apps = HungCao.Apps || (HungCao.Apps = {}));
})(HungCao || (HungCao = {}));
