import puppeteer, { Browser, Page } from 'puppeteer';
import { IBrowserService } from '../interfaces/ibrowser-service';

export class BrowserService implements IBrowserService {
    private browser!: Browser;
    private page!: Page;

    public async launch(): Promise<void> {
        this.browser = await puppeteer.launch({ headless: false });

        // Используем первую вкладку, если она уже открыта
        const pages = await this.browser.pages();
        if (pages.length > 0) {
            this.page = pages[0];
        } else {
            this.page = await this.browser.newPage();
        }
    }

    public async close(): Promise<void> {
        if (this.browser) {
            await this.browser.close();
        }
    }

    public async getPage(): Promise<Page> {
        if (!this.page) {
            throw new Error("Browser not initialized. Call 'launch' first.");
        }
        return this.page;
    }
}
