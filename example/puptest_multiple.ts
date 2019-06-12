// ROOT/example/puptest_multiple.ts

// import { profiles } from "./podcast-profile";
import { run } from "./run-puppeteer";
// import { IPodcastProfile } from "./types/IPodcastProfile";

// const numberOfPromises: number = profiles.length;
// ScrapePodcastInfoAsync(theProfiles: IPodcastProfile[])

export async function ScrapeMultiplePodcastInfoAsync(rawUrls: any) {
  // const {podcastUrls: indexUrls} = rawUrls;
  return Promise.all(
    rawUrls.podcastUrls.map(async (podcastUrl: string) => {
      return await run({ indexUrl: podcastUrl });
    })
  );
}

// ScrapePodcastInfoAsync(profiles)
//   .then((links: any) => console.log({ total_records: numberOfPromises, links }))
//   .catch(console.error);
