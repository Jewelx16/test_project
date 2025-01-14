import {Page} from 'puppeteer';
import {PuppeteerHelper} from "../utils/puppeteer-helper ";
import {IFilterService} from "../interfaces/i-filter-service";

export class FilterService implements IFilterService {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async applyFilter(): Promise<void> {
        const maxRetries = 10;

        // for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                await this.page.waitForTimeout(2000);
                await this.page.waitForSelector('.continue', {timeout: 5000});
                await this.page.click('.continue');

                await this.page.waitForTimeout(2000);
                await this.page.waitForSelector('button.header__filter-action', {timeout: 5000});
                await this.page.click('button.header__filter-action');

                await this.page.waitForTimeout(2000);
                await this.page.select('select.filter-pairs__select', '26-30');
                await this.page.click('button.filter-pairs__action');

                console.log('Filter applied successfully.');
            } catch (error) {
                // console.error('Error during filter application:', error);
                throw error;
            }
        // }
    }
}
