import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

import { Podcast } from "./Podcast";

@ObjectType()
@Entity()
export class PodcastEpisode extends BaseEntity {
  @Field(() => ID, { nullable: true })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  url: string;

  // @ts-ignore
  @Field(type => Podcast, { nullable: true })
  @ManyToOne(() => Podcast, podcast => podcast.episodes, { cascade: true })
  podcast: Podcast;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column()
  date: Date;
}
