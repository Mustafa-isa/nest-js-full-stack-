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
const puppeteer = require("puppeteer");
let ScrapingService = class ScrapingService {
    async scrapeUserProfileImage(linkedinProfileUrl) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(linkedinProfileUrl);
        const profileImageUrl = await page.evaluate(() => {
            const imageElement = document.getElementById('ember816');
            return imageElement?.getAttribute('src') || '';
        });
        await browser.close();
        return profileImageUrl;
    }
};
exports.ScrapingService = ScrapingService;
exports.ScrapingService = ScrapingService = __decorate([
    (0, common_1.Injectable)()
], ScrapingService);
//# sourceMappingURL=scrap.service.js.map