import { BrowserService } from './services/browser-service';
import { Authenticator } from './services/authenticator';
import { LikerService } from './services/liker-service';
import { Config } from './config/config';
import { App } from './app';
import {FilterService} from "./services/filter-service";

(async () => {
    const browserService = new BrowserService();
    await browserService.launch();
    const page = await browserService.getPage();

    const authenticator = new Authenticator(page, Config.LOGIN_URL, Config.CREDENTIALS);
    const filterService = new FilterService(page);
    const likerService = new LikerService(page);

    const app = new App(browserService, authenticator, filterService, likerService);
    await app.run();
})();