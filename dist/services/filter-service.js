"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterService = void 0;
class FilterService {
    constructor(page) {
        this.page = page;
    }
    async applyFilter() {
        const maxRetries = 10;
        // for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log('Закрываем попап при необходимости...');
            await this.page.waitForTimeout(2000);
            await this.page.waitForSelector('.continue', { timeout: 5000 });
            await this.page.click('.continue');
            // Еще раз ждем, чтобы сайт точно успел обработать клик
            await this.page.waitForTimeout(2000);
            await this.page.waitForSelector('button.header__filter-action', { timeout: 5000 });
            await this.page.click('button.header__filter-action');
            // Выбираем значение в селекте с задержкой
            await this.page.waitForTimeout(2000);
            await this.page.select('select.filter-pairs__select', '26-30');
            await this.page.click('button.filter-pairs__action');
            console.log('Filter applied successfully.');
        }
        catch (error) {
            // console.error('Error during filter application:', error);
            throw error;
        }
        // }
    }
}
exports.FilterService = FilterService;
