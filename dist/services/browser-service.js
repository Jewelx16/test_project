"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserService = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
class BrowserService {
    async launch() {
        this.browser = await puppeteer_1.default.launch({ headless: false });
        // Используем первую вкладку, если она уже открыта
        const pages = await this.browser.pages();
        if (pages.length > 0) {
            this.page = pages[0];
        }
        else {
            this.page = await this.browser.newPage();
        }
    }
    async close() {
        if (this.browser) {
            await this.browser.close();
        }
    }
    async getPage() {
        if (!this.page) {
            throw new Error("Browser not initialized. Call 'launch' first.");
        }
        return this.page;
    }
}
exports.BrowserService = BrowserService;
