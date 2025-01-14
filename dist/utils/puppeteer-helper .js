"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PuppeteerHelper = void 0;
class PuppeteerHelper {
    /**
     * Принудительная пауза на указанное количество миллисекунд.
     * Например, await PuppeteerHelper.sleep(1000); — задержка в 1 секунду.
     */
    static async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
exports.PuppeteerHelper = PuppeteerHelper;
