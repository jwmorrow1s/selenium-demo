import webdriver, { ThenableWebDriver } from 'selenium-webdriver';
import { promises as fs } from 'fs';
import { join } from 'path';

type Runnable = () => Promise<void> | void;
export type EmbellishedRunnableThenDriver = ThenableWebDriver & {
    runSimple: (test: Runnable) => Promise<void> | void | never,
    snapshotToFile: (url: string) => Promise<void>,
};

export const driver: EmbellishedRunnableThenDriver = (function() {
    const baseInstance: ThenableWebDriver = new webdriver.Builder().forBrowser('chrome').build();
    const embellishedInstance: EmbellishedRunnableThenDriver = Object.assign(
        baseInstance, 
        { 
            runSimple: async function(test: Runnable){
                try {
                    await test();
                } catch(err){
                    this.quit();
                } finally {
                    this.quit();
                }
            },
            snapshotToFile: async function(name: string) {
                // 3/28/2022 -> 3_28_2022
                const formattedDate = `_${new Date().toLocaleDateString().replace(/\//g, '_')}_`;
                // 11:50:41 AM -> 11_50_41_AM
                const formattedTime = `_${new Date().toLocaleTimeString().replace(/:| /g, '_')}_`;
                const formattedName = `${name}_${formattedDate}${formattedTime}.png`;
                // public/test/results/images/$name_$formattedDate$FormattedTime.png
                const destination: string = join('public', 'results', 'images', formattedName);

                const pngBytesBase64Encoded: string = await this.takeScreenshot();
                try {
                    await fs.writeFile(destination, Buffer.from(pngBytesBase64Encoded, 'base64'));
                } catch (err) { 
                    console.log(err.message);
                    console.log('couldn\'t write to file');
                }
            }
        }
    )
    return embellishedInstance;
})();