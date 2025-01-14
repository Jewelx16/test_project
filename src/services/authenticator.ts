import { Page } from 'puppeteer';
import { IAuthenticator } from '../interfaces/iauthenticator';

export class Authenticator implements IAuthenticator {
    private readonly page: Page;
    private readonly loginUrl: string;
    private readonly credentials: { email: string; password: string };

    constructor(page: Page, loginUrl: string, credentials: { email: string; password: string }) {
        this.page = page;
        this.loginUrl = loginUrl;
        this.credentials = credentials;
    }

    public async login(): Promise<void> {
        try {
            console.log('Navigating to login page...');
            await this.page.goto(this.loginUrl, { waitUntil: 'networkidle2' });

            await this.page.waitForSelector('input.signup__field-item[type="text"]', { timeout: 5000 });
            await this.page.type('input.signup__field-item[type="text"]', this.credentials.email);

            await this.page.waitForSelector('input.signup__field-item[type="password"]', { timeout: 5000 });
            await this.page.type('input.signup__field-item[type="password"]', this.credentials.password);

            console.log('Submitting the form...');
            await this.page.waitForSelector('.signin__action', { timeout: 5000 });
            await this.page.click('.signin__action');
            await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
            console.log('Login successful');
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

}
