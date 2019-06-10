// ROOT/example/puptest.ts

// const profiles = require("./podcast-profile");
// const run = require("./run-puppeteer");
import { profiles } from "./podcast-profile";
import { run } from "./run-puppeteer";
// import { IPodcastProfile } from "./types/IPodcastProfile";

const { indexUrl } = profiles[0];

run({ indexUrl })
  .then((links: any) => console.log(links))
  .catch(console.error);
