"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticator = void 0;
class Authenticator {
    constructor(page, loginUrl, credentials) {
        this.page = page;
        this.loginUrl = loginUrl;
        this.credentials = credentials;
    }
    async login() {
        try {
            console.log('Navigating to login page...');
            await this.page.goto(this.loginUrl, { waitUntil: 'networkidle2' });
            await this.page.waitForSelector('input.signup__field-item[type="text"]', { timeout: 5000 });
            await this.page.type('input.signup__field-item[type="text"]', this.credentials.email);
            await this.page.waitForSelector('input.signup__field-item[type="password"]', { timeout: 5000 });
            await this.page.type('input.signup__field-item[type="password"]', this.credentials.password);
            console.log('Submitting the form...');
            // Ожидание кнопки подтверждения
            await this.page.waitForSelector('.signin__action', { timeout: 5000 });
            // Клик по кнопке входа
            await this.page.click('.signin__action');
            // Ожидание завершения навигации
            await this.page.waitForNavigation({ waitUntil: 'networkidle2' });
            console.log('Login successful');
        }
        catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }
}
exports.Authenticator = Authenticator;
