// ROOT/example/puptest_multiple.ts

import { profiles } from "./podcast-profile";
import { run } from "./run-puppeteer";
import { IPodcastProfile } from "./types/IPodcastProfile";

const numberOfPromises: number = profiles.length;

async function ScrapePodcastInfoAsync(theProfiles: IPodcastProfile[]) {
  return Promise.all(
    theProfiles.map(async (podcast: IPodcastProfile) => {
      const { indexUrl } = podcast;
      return await run({ indexUrl });
    })
  );
}

ScrapePodcastInfoAsync(profiles)
  .then((links: any) => console.log({ total_records: numberOfPromises, links }))
  .catch(console.error);
