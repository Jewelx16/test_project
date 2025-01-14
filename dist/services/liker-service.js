"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikerService = void 0;
class LikerService {
    constructor(page) {
        this.page = page;
    }
    async likeUsers() {
        try {
            console.log('Starting to like users...');
            let hasMoreUsers = true;
            while (hasMoreUsers) {
                // Находим все блоки, содержащие список пользователей
                const userLists = await this.page.$$('.users__list');
                if (userLists.length === 0) {
                    console.log('No more ".users__list" blocks found.');
                    break;
                }
                // Перебираем каждый блок .users__list
                for (const list of userLists) {
                    // Ищем все кнопки .controls__btn внутри .users__list
                    const controlButtons = await list.$$('.controls__btn');
                    for (const btn of controlButtons) {
                        // Проверяем, есть ли внутри кнопки элемент с классом .icon-like
                        const likeIcon = await btn.$('.icon-like');
                        if (likeIcon) {
                            await btn.click();
                            console.log('Liked a user!');
                        }
                    }
                }
                // Делаем небольшую паузу, чтобы элементы успели загрузиться
                await this.page.waitForTimeout(2000);
            }
            console.log('Finished liking users.');
        }
        catch (error) {
            console.error('Error in likeUsers:', error);
            throw error;
        }
    }
}
exports.LikerService = LikerService;
