import { Page } from 'puppeteer';

export interface IBrowserService {
    launch(): Promise<void>;
    close(): Promise<void>;
    getPage(): Promise<Page>;
}