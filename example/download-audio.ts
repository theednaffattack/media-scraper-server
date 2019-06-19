// const puppeteer = require("puppeteer");
// const fs = require("fs");
// const request = require("request");

import puppeteer from "puppeteer";
import fs from "fs";
import request from "request";

interface IDownloadParams {
  uri: any;
  filename: string;
  callback: any;
}

//  This is main download function which takes the url of your image
// @ts-ignore
function download({ uri, filename, callback }: IDownloadParams) {
  // @ts-ignore
  request.head(uri, function(err: any, res: any, body: any) {
    request(uri)
      .pipe(fs.createWriteStream(filename))
      .on("close", callback);
  });
}

let scrape = async () => {
  // Actual Scraping goes Here...
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    args: ["--auto-open-devtools-for-tabs"]
  });
  const page = await browser.newPage();
  await page.goto(
    // "https://hwcdn.libsyn.com/p/b/f/a/bfa35dc1c879fd99/Syntax153.mp3?c_id=44847596&cs_id=44847596&destination_id=532671&expiration=1560831056&hwt=ab551f9f8edf105fa4a452ead46dc076"
    "https://www.podbean.com/media/share/dir-v84ir-6573cf8?utm_campaign=w_share_ep&utm_medium=dlink&utm_source=w_share"
  );
  //   await page.waitFor(5000);
  await page.waitForSelector("audio");

  let audioSourceFirstPage = await page.evaluate(
    () =>
      // document.querySelector("img.image") // image selector
      // audio selector
      // document
      //   .querySelector<HTMLAudioElement>(".pd_player_box audio source")
      //   .getAttribute("src")

      document.querySelectorAll("audio") //.getAttribute("src")
  ); // here we got the audio url.

  //   let audioSourceFirstPage2 = await page.evaluate(
  //     () =>
  //       // document.querySelector("img.image") // image selector
  //       // audio selector
  //       // document
  //       //   .querySelector<HTMLAudioElement>(".pd_player_box audio source")
  //       //   .getAttribute("src")

  //       document.querySelector("audio") //.getAttribute("src")
  //   ); // here we got the audio url.

  //   [audioSourceFirstPage, audioSourceFirstPage2].map(item =>
  //     JSON.stringify(Array.from(item))
  //   );

  browser.close();
  return {
    uri: JSON.stringify(Array.from(audioSourceFirstPage))
  };
  //   audioSourceFirstPage = audioSourceFirstPage
  //     ? audioSourceFirstPage
  //     : "http://example.com";

  //   await page.goto(audioSourceFirstPage);
  //   await page.waitFor(1000);

  //   let audioSourceSecondPage = await page.evaluate(() =>
  //     document
  //       .querySelector<HTMLAudioElement>("body > video > source")
  //       .getAttribute("src")
  //   );

  //   if (audioSourceSecondPage) {
  //     console.log("yeah!");
  //     let uri = audioSourceSecondPage;
  //     // Now just simply pass the audio url to the downloader function to
  //     // download  the audio.
  //     download({
  //       uri,
  //       filename: "audio.mp3",
  //       callback: function() {
  //         console.log("Audio file downloaded");
  //       }
  //     });
  //   }

  //   if (!audioSourceSecondPage) {
  //     console.log("something went wrong, no audio source");
  //   }
};

scrape()
  .then(data => console.log(data))
  .catch(err => console.log(err));
