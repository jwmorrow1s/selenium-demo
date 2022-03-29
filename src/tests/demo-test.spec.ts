import { assert } from 'chai';
import { By, Key, until } from 'selenium-webdriver';
import { driver } from '../lib/drivers/driver';

describe('demo-test', () => {
    it('basic navigation', async () => {
        await driver.runSimple(async () => {
            await driver.get('https://google.com/ncr');
            // (await driver.findElement(By.name('q'))).sendKeys(
            //     'webdriver',
            //     Key.RETURN
            // );
            // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
            await driver.snapshotToFile('title');

            assert(
                (await driver.getCurrentUrl()) === 'https://google.com/ncr',
                "url should be 'https://google.com/ncr'"
            );
            // assert(
            //     (await driver.getTitle()) === 'webdriver - Google Search',
            //     'expected the current title to be "webdriver - Google Search".'
            // );
        });
    });
});
