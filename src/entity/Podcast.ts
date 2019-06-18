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

  @Field({ nullable: true })
  @Column({ nullable: true })
  image: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  feedLink: string;

  // @ts-ignore
  @Field(type => [PodcastEpisode], { nullable: true })
  @OneToMany(() => PodcastEpisode, podcastepisode => podcastepisode.podcast)
  episodes: PodcastEpisode[];

  @Field()
  @Column("timestamp", {
    precision: 3,
    default: () => "CURRENT_TIMESTAMP(3)",
    onUpdate: "CURRENT_TIMESTAMP(3)"
  })
  updateAt: Date;

  // // @ts-ignore
  // @Field(type => [Subscription], { nullable: true })
  // @ManyToMany(() => Subscription, subscription => subscription.podcasts)
  // subscriptions: PodcastEpisode[];
}
