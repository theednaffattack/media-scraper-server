import puppeteer from "puppeteer";

export interface IPodcastInfo {
  image: string;
  title: string;
  feedLink: string;
  episodes: any;
}

export const run = async ({ indexUrl }: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(
        // "https://www.podbean.com/podcast-detail/d4un8-57595/JavaScript-Jabber-Podcast"
        indexUrl
      );
      //   let episodeLinks = await page.evaluate(() => {
      //     return Array.from(document.querySelectorAll("a.title")).map(item => ({
      //       url: item.getAttribute("href"),
      //       text: item.innerText,
      //     }))
      //   })

      // THIS MY ADDITION

      let getShowImage = await page.evaluate(() => {
        let thingToReturn: string | null = (<HTMLElement>(
          document.querySelector(
            "#wrap > div.user-main > div.usersite-wrap > div.usersite-container > div > div.usersite-content > div > div.span8.clearfix.main-left > div.vcard-panel.vcard-external > div.user-avatar.user-image > a > img"
          )
        )).getAttribute("src");

        let finalReturn =
          thingToReturn !== null ? thingToReturn : "Show Image not found";
        return finalReturn;
      });

      let getShowTitle = await page.evaluate(() => {
        let thingToReturn: string = (<HTMLElement>(
          document.querySelector(
            "#wrap > div.user-main > div.usersite-wrap > div.usersite-container > div > div.usersite-header > h1"
          )
        )).innerText;
        let finalReturn =
          thingToReturn !== null ? thingToReturn : "Show Title not found";
        return finalReturn;
      });

      let getFeedLink = await page.evaluate(() => {
        let thingToReturn: string | null = (<HTMLElement>(
          document.querySelector(
            "#wrap > div.user-main > div.usersite-wrap > div.usersite-container > div > div.usersite-header > p > a"
          )
        )).getAttribute("href");
        let finalReturn =
          thingToReturn !== null ? thingToReturn : "Show Image not found";
        return finalReturn;
      });

      let episodeInfo = await page.evaluate(() => {
        let thingToReturn = Array.from(
          document.querySelectorAll("tbody.items > tr > td:nth-child(2)")
        ).map(item => ({
          url: item.children[0].getAttribute("href"),
          text: (<HTMLElement>item.children[0]).innerText,
          date: (<HTMLElement>item.children[1]).innerText
        }));
        let finalReturn =
          thingToReturn !== null ? thingToReturn : "Show Image not found";
        return finalReturn;
      });

      browser.close();
      return resolve({
        image: getShowImage,
        title: getShowTitle,
        feedLink: getFeedLink,
        episodes: episodeInfo
      });
      // THIS MY ADDITION
    } catch (e) {
      return reject(e);
    }
  });
};
