import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
  // ManyToMany
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql"; // , Subscription

import { PodcastEpisode } from "./PodcastEpisode";

@ObjectType()
@Entity()
export class Podcast extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name: string;

  @Field()
  @Column()
  image: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title: string;

  @Field()
  @Column()
  feedLink: string;

  // @ts-ignore
  @Field(type => [PodcastEpisode], { nullable: true })
  @OneToMany(() => PodcastEpisode, podcastepisode => podcastepisode.podcast)
  episodes: PodcastEpisode[];

  // // @ts-ignore
  // @Field(type => [Subscription], { nullable: true })
  // @ManyToMany(() => Subscription, subscription => subscription.podcasts)
  // subscriptions: PodcastEpisode[];
}
