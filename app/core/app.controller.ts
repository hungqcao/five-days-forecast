namespace HungCao.Apps {
    'use strict';

    class AppController {
        private loader:ConfigLoader;
        private loaded:boolean;

        static $inject = ['configLoader'];

        constructor(configLoader:ConfigLoader) {
            this.loader = configLoader;
            this.loadConfig();
        }

        private loadConfig = () => {
            this.loader.importConfig(this.onLoadCompleted);
        }

        private onLoadCompleted = (success:boolean):void => {
            if (success) {
                this.loaded = true;
            }
            else {
                console.error('Unable to load configuration');
            }
        }
    }

    angular.module('app').controller('AppController', AppController);
}