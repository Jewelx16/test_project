export class PuppeteerHelper {
    /**
     * Принудительная пауза на указанное количество миллисекунд.
     * Например, await PuppeteerHelper.sleep(1000); — задержка в 1 секунду.
     */
    public static async sleep(ms: number): Promise<any> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}