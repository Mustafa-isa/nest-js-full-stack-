// src/scraping/scraping.service.ts

import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScrapingService {
  async scrapeUserProfileImage(linkedinProfileUrl: string): Promise<string | null> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Navigate to the LinkedIn profile
    await page.goto(linkedinProfileUrl);
    
    // Get the profile image URL
    const profileImageUrl = await page.evaluate(() => {
      const imageElement = document.getElementById('ember816');
      return imageElement?.getAttribute('src') || '';
    });
    
    await browser.close();

    return profileImageUrl;
  }
  }
