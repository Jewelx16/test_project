"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browser_service_1 = require("./services/browser-service");
const authenticator_1 = require("./services/authenticator");
const liker_service_1 = require("./services/liker-service");
const config_1 = require("./config/config");
const app_1 = require("./app");
const filter_service_1 = require("./services/filter-service");
(async () => {
    const browserService = new browser_service_1.BrowserService();
    await browserService.launch();
    const page = await browserService.getPage();
    const authenticator = new authenticator_1.Authenticator(page, config_1.Config.LOGIN_URL, config_1.Config.CREDENTIALS);
    const filterService = new filter_service_1.FilterService(page);
    const likerService = new liker_service_1.LikerService(page);
    const app = new app_1.App(browserService, authenticator, filterService, likerService);
    await app.run();
})();
