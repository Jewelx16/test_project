import { Page } from 'puppeteer';
import { ILikerService } from '../interfaces/iliker-service';

export class LikerService implements ILikerService {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async likeUsers(): Promise<void> {
        try {
            console.log('Starting to like users...');

            let hasMoreUsers = true;

            while (hasMoreUsers) {
                const userLists = await this.page.$$('.users__list');
                if (userLists.length === 0) {
                    console.log('No more ".users__list" blocks found.');
                    break;
                }

                for (const list of userLists) {
                    const controlButtons = await list.$$('.controls__btn');

                    for (const btn of controlButtons) {
                        const likeIcon = await btn.$('.icon-like');
                        if (likeIcon) {
                            await btn.click();
                            console.log('Liked a user!');
                        }
                    }
                }

                await this.page.waitForTimeout(2000);
            }

            console.log('Finished liking users.');
        } catch (error) {
            console.error('Error in likeUsers:', error);
            throw error;
        }
    }
}
