import {
  ClassType,
  Query,
  Resolver
  //   Arg,
  // InputType,
  // Field
} from "type-graphql";

// import { Podcast } from "../../entity/Podcast";
import { GenericKeys } from "../../types/GenericKeys";
import { PodcastEpisode } from "../../entity/PodcastEpisode";

function getBaseResolver<T extends ClassType>(
  suffix: string,
  objectTypeCls: T,
  entity: any,
  relation?: string,
  findInstructions?: GenericKeys
) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    // @ts-ignore
    @Query(type => [objectTypeCls], { name: `getAll${suffix}` })
    // @ts-ignore
    async getAll(): Promise<any> {
      let finalReturns = await entity.find({
        relations: [relation],
        findInstructions
      });

      console.log(JSON.stringify(finalReturns, null, 2));
      return finalReturns;
    }
  }

  return BaseResolver;
}

// @InputType()
// class PodcastNameInput {
//   @Field()
//   name: string;
// }

// const BaseCreateUserResolver = createBaseResolver(
//   "User",
//   User,
//   RegisterInput,
//   User
// );

const BaseGetAllPodcastEpisodesResolver = getBaseResolver(
  "PodcastEpisode",
  PodcastEpisode,
  // PodcastNameInput,
  PodcastEpisode,
  "podcast",
  {
    order: {
      title: "DESC"
    }
  }
);

// @Resolver()
// export class CreateUserResolver extends BaseCreateUserResolver {
//   //   @Mutation(() => User)
//   //   async createUser(@Arg("data") data: RegisterInput) {
//   //     // @todo: add hashing of password
//   //     return User.create(data).save();
//   //   }
// }

@Resolver()
export class GetAllPodcastEpisodesResolver extends BaseGetAllPodcastEpisodesResolver {
  //   @Mutation(() => User)
  //   async createUser(@Arg("data") data: RegisterInput) {
  //     // @todo: add hashing of password
  //     return User.create(data).save();
  //   }
}
// mutation Register($data: RegisterInput!){
//     register(data: $data){
//       id
//       firstName
//       lastName
//       email
//       name
//     }
//   }
