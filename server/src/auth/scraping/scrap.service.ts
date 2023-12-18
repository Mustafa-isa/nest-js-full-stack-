// src/scraping/scraping.service.ts

import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScrapingService {
  async scrapeUserProfileImage(
    linkedinProfileUrl: string,
  ): Promise<string | null> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
      // Increase the timeout for page navigation to 60 seconds (60000 milliseconds)
      await page.goto(linkedinProfileUrl, { timeout: 60000 });
      console.log('Navigated to LinkedIn profile:', linkedinProfileUrl);

      // Wait for a more general selector related to the profile image
      await page.waitForSelector('.navbar-brand img');

      // Get the profile image URL
      const profileImageUrl = await page.evaluate(() => {
        return new Promise((resolve) => {
          const waitForImage = () => {
            const imageElement = document.querySelector('.navbar-brand img');
            if (imageElement) {
              console.log('Profile image element:', imageElement);
              resolve(imageElement.getAttribute('src') || '');
            } else {
              setTimeout(waitForImage, 10000); // Adjust the interval as needed
            }
          };

          waitForImage();
        });
      });

      console.log('Profile image URL:', profileImageUrl);

      // Rest of your code...
    } catch (error) {
      console.error('An error occurred during scraping:', error);
      // Handle the error appropriately
      return null;
    } finally {
      await browser.close();
    }
  }
}
