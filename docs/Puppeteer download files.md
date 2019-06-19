From: https://stackoverflow.com/questions/52542149/how-can-i-download-images-on-a-page-using-puppeteer

## Adaptation for an audio file

```javascript
const puppeteer = require("puppeteer");
const fs = require("fs");
const request = require("request");

//  This is main download function which takes the url of your image
function download(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    request(uri)
      .pipe(fs.createWriteStream(filename))
      .on("close", callback);
  });
}

let scrape = async () => {
  // Actual Scraping goes Here...
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://www.podbean.com/media/share/dir-v84ir-6573cf8?utm_campaign=w_share_ep&utm_medium=dlink&utm_source=w_share"
  );
  await page.waitFor(1000);
  const audioUrl = await page.evaluate(() =>
    // document.querySelector("img.image") // image selector
    // audio selector
    document.querySelector(".pd_player_box  audio source").getAttribute("src")
  ); // here we got the audio url.
  // Now just simply pass the audio url to the downloader function to
  // download  the audio.
  download(audioUrl, "audio.mp3", function() {
    console.log("Audio file downloaded");
  });
};

scrape();
```
