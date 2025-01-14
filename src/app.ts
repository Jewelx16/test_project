import {IBrowserService} from './interfaces/ibrowser-service';
import {IAuthenticator} from './interfaces/iauthenticator';
import {ILikerService} from './interfaces/iliker-service';
import {IFilterService} from "./interfaces/i-filter-service";

export class App {
    private readonly browserService: IBrowserService;
    private readonly authenticator: IAuthenticator;
    private readonly filterService: IFilterService;
    private readonly likerService: ILikerService;

    constructor(
        browserService: IBrowserService,
        authenticator: IAuthenticator,
        filterService: IFilterService,
        likerService: ILikerService
    ) {
        this.browserService = browserService;
        this.authenticator = authenticator;
        this.filterService = filterService;
        this.likerService = likerService;
    }

    public async run(): Promise<void> {
        let retries = 1;

        while (retries > 0) {
            try {
                await this.browserService.launch();
                await this.authenticator.login();
                await this.filterService.applyFilter();
                await this.likerService.likeUsers();
                break;
            } catch (error) {
                console.error('Automation failed. Retrying...', error);
                retries--;

                if (retries === 0) {
                    console.error('Maximum retry attempts reached. Exiting.');
                }
            } finally {
                await this.browserService.close();
            }
        }
    }
}
