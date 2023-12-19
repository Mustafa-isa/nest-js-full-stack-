// src/scraping/scraping.service.ts
 import { Injectable } from '@nestjs/common';
 import { Builder, By, until } from 'selenium-webdriver';
 import { Options } from 'selenium-webdriver/chrome';


@Injectable()
export class ScrapingService {

  async scrapeProfileImage(url: string): Promise<string> {
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(new Options().headless()).build();

    await driver.get(url);

    let imageElement = await driver.wait(until.elementLocated(By.className('profile-picture-container')), 10000);
    let image = await imageElement.getAttribute('src');

    await driver.quit();

    return image;
  }
}
