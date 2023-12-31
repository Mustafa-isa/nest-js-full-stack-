"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapingService = void 0;
const common_1 = require("@nestjs/common");
const selenium_webdriver_1 = require("selenium-webdriver");
const chrome_1 = require("selenium-webdriver/chrome");
let ScrapingService = class ScrapingService {
    async scrapeProfileImage(url) {
        let driver = await new selenium_webdriver_1.Builder().forBrowser('chrome').setChromeOptions(new chrome_1.Options().headless()).build();
        await driver.get(url);
        let imageElement = await driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.className('profile-picture-container')), 10000);
        let image = await imageElement.getAttribute('src');
        await driver.quit();
        return image;
    }
};
exports.ScrapingService = ScrapingService;
exports.ScrapingService = ScrapingService = __decorate([
    (0, common_1.Injectable)()
], ScrapingService);
//# sourceMappingURL=scrap.service.js.map