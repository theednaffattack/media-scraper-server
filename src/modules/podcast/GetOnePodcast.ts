import {
  Resolver,
  Query,
  Arg,
  ClassType
  // InputType,
  // Field
} from "type-graphql";

//   import { User } from "../../entity/User";
import { Podcast } from "../../entity/Podcast";
// import { PodcastEpisode } from "../../entity/PodcastEpisode";
// import { EntitySchema } from "typeorm";

function getBaseResolver<T extends ClassType>(
  suffix: string,
  objectTypeCls: T,
  // inputType: X,
  entity: any,
  relation?: string
) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    // @ts-ignore
    @Query(type => objectTypeCls, { name: `getOne${suffix}` })
    // @ts-ignore
    async getOne(@Arg("name") name: string): Promise<any> {
      return await entity.findOne({
        where: { title: name },
        relations: [relation]
      });
    }

    //   @Mutation(() => returnType, { name: `create${suffix}` })
    //   async create(@Arg("data", () => inputType) data: any) {
    //     // @todo: add hashing of password
    //     return entity.create(data).save();
    //   }
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

const BaseGetPodcastResolver = getBaseResolver(
  "Podcast",
  Podcast,
  // PodcastNameInput,
  Podcast,
  "episodes"
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
export class GetOnePodcastResolver extends BaseGetPodcastResolver {
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
