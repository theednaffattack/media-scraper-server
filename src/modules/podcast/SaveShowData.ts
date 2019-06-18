import {
  Resolver,
  Mutation,
  Arg,
  ClassType,
  InputType,
  Field
} from "type-graphql";

//   import { User } from "../../entity/User";
import { Podcast } from "../../entity/Podcast";
import { ScrapeMultiplePodcastInfoAsync } from "../../../example/puptest_multiple";
import { PodcastEpisode } from "../../entity/PodcastEpisode";
// import { PodcastEpisode } from "../../entity/PodcastEpisode";
// import { profiles } from "../../../example/podcast-profile";

interface Iargs {
  id: string;
  url: string;
  text: string;
  date: string;
}

function createBaseResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity?: any,
  relations?: string[]
) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    // @ts-ignore
    // @Query(type => [objectTypeCls], { name: `getAll${suffix}` })

    // @ts-ignore
    @Mutation(type => [returnType], { name: `create${suffix}` })
    async create(@Arg("data", () => inputType) data: any) {
      // @todo: // use puppeteer function here.
      console.log(data);
      console.log(data);
      const seeMyData: any[] = await ScrapeMultiplePodcastInfoAsync(data); // profiles

      const transformData_Date_Fields = await Promise.all(
        seeMyData.map(async showInfo => {
          const existingPodcast = await entity.findOne({
            where: { title: showInfo.title },
            relations: relations ? [...relations] : []
          });

          let newShow;

          if (existingPodcast) {
            showInfo.id = existingPodcast.id;
          }

          if (!existingPodcast) {
            newShow = await entity.create(showInfo).save();
            showInfo.id = newShow.id;
          }

          const whichNewOrExistingShow = existingPodcast
            ? existingPodcast
            : newShow;

          const formattedInfo = await Promise.all(
            showInfo.episodes.map(async ({ id, url, text, date }: Iargs) => {
              const existingPodcastEpisode = await PodcastEpisode.findOne({
                where: {
                  title: showInfo.title,
                  podcast: whichNewOrExistingShow,
                  date: new Date(date)
                }
              });

              console.log("existingPodcastEpisode");
              console.log(!!existingPodcastEpisode);
              console.log(existingPodcastEpisode);

              // if exists, return transformed dates and associate podcast
              if (existingPodcastEpisode) {
                return existingPodcastEpisode;
              }
              if (!existingPodcastEpisode) {
                let newEpisode = await PodcastEpisode.create({
                  id,
                  url,
                  text,
                  podcast: whichNewOrExistingShow,
                  date: new Date(date)
                }).save();
                console.log("newEpisode if condition".toUpperCase());
                console.log(newEpisode);
                return newEpisode;
              } else {
                console.log("SOME FAILURE");
                let newEpisode = await PodcastEpisode.create({
                  id,
                  url,
                  text,
                  podcast: whichNewOrExistingShow,
                  date: new Date(date)
                }).save();

                console.log("newEpisode else condition".toUpperCase());
                console.log(newEpisode);
                return newEpisode;
              }
            })
          );

          console.log("formattedInfo");
          console.log(formattedInfo);

          // const getRelation = relations![0];

          // let entityItem = new entity();

          // entityItem[getRelation] = [...formattedInfo];

          // let viewThisPodcast = await entityItem.save();

          // console.log("viewThisPodcast");
          // console.log(viewThisPodcast);

          // return viewThisPodcast;

          return { ...showInfo, episodes: [...formattedInfo] };
        })
      );

      console.log("VIEW EXISTING RECORD AND SEARCH TERM");
      //   let [one, two] = transformData_Date_Fields;
      // @ts-ignore
      console.log(transformData_Date_Fields);
      //   console.log(existingRecord);
      return await entity.save(transformData_Date_Fields);
    }
  }

  return BaseResolver;
}

@InputType()
class PodcastInput {
  // @ts-ignore
  @Field(type => [String])
  podcastUrls: string[];
}

const BaseCreatePodcastResolver = createBaseResolver(
  "Podcast",
  Podcast,
  PodcastInput,
  Podcast,
  ["episodes"]
);

@Resolver()
export class CreatePodcastResolver extends BaseCreatePodcastResolver {
  //   @Mutation(() => User)
  //   async createUser(@Arg("data") data: RegisterInput) {
  //     // @todo: add hashing of password
  //     return User.create(data).save();
  //   }
}
