"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
class App {
    constructor(browserService, authenticator, filterService, likerService) {
        this.browserService = browserService;
        this.authenticator = authenticator;
        this.filterService = filterService;
        this.likerService = likerService;
    }
    async run() {
        let retries = 1;
        while (retries > 0) {
            try {
                await this.browserService.launch();
                await this.authenticator.login();
                await this.filterService.applyFilter();
                await this.likerService.likeUsers();
                break;
            }
            catch (error) {
                console.error('Automation failed. Retrying...', error);
                retries--;
                if (retries === 0) {
                    console.error('Maximum retry attempts reached. Exiting.');
                }
            }
            finally {
                await this.browserService.close();
            }
        }
    }
}
exports.App = App;
