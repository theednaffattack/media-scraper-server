// OG Form of this module to preserve `onConflict` TypeORM method below
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
  entity?: any
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
      const seeMyData: any[] = await ScrapeMultiplePodcastInfoAsync(data); // profiles

      const transformData_Date_Fields = seeMyData.map(showInfo => {
        const formattedInfo = showInfo.episodes.map(
          ({ id, url, text, date }: Iargs) => ({
            id,
            url,
            text,
            date: new Date(date)
          })
        );
        return { ...showInfo, episodes: [...formattedInfo] };
      });

      console.log(transformData_Date_Fields);

      // upsert
      // from: https://github.com/typeorm/typeorm/issues/1090#issuecomment-346263831
      const findAMatchingIDAndStop = await Podcast.createQueryBuilder()
        .insert()
        .into(Podcast)
        .values(transformData_Date_Fields[0])
        .onConflict(`("id") DO NOTHING`)
        .execute();

      //   const ifAnIDMatchesUpdateTitleField = await Podcast.createQueryBuilder()
      //     .insert()
      //     .into(Podcast)
      //     .values(transformData_Date_Fields[0])
      //     .onConflict(`("title") DO UPDATE SET "text" = :title`)
      //     .setParameter("title", transformData_Date_Fields[0].title)
      //     .execute();

      console.log("findAMatchingIDAndStop & ifAnIDMatchesUpdateTitleField");
      console.log(findAMatchingIDAndStop);
      //   console.log(ifAnIDMatchesUpdateTitleField);

      //   console.log(transformData_Date);
      return entity.save(transformData_Date_Fields);
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
  Podcast
);

@Resolver()
export class CreatePodcastResolver extends BaseCreatePodcastResolver {
  //   @Mutation(() => User)
  //   async createUser(@Arg("data") data: RegisterInput) {
  //     // @todo: add hashing of password
  //     return User.create(data).save();
  //   }
}
