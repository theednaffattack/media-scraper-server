import { Column, PrimaryColumn, Repository, UpdateDateColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";

export class SomeServiceClass {
  constructor(private repo: Repository<SomeAggregate>) {}

  public async handleSomeEventWithTypeORMMethods(
    event: ISomeEvent
  ): Promise<SomeAggregate> {
    let model = await this.repo.findOne({
      id: event.id
    });

    if (!model) {
      model = new SomeAggregate();
    }

    model.valueToUpdate = event.valueToUpdate;

    // await this.repo.persist(model);

    // let updatedModel;

    const updatedModel = await this.repo
      .findOne({
        id: event.id
      })
      .then(data => data)
      .catch(error => console.error(error));

    let faker = {
      id: "nope",
      name: "fake",
      title: "fake",
      feedLink: "http://fake.com",
      episodes: Array.from("0X0X0X").map((_, index) => [
        {
          url: `fake-episode-url-${index}`,
          id: `fake-episode-id-${index}`,
          text: `fake-episode-text-${index}`,
          date: new Date()
        }
      ]),
      image: ""
    };
    return updatedModel || faker;
  }

  public async handleSomeEventWithRawQuery(
    event: ISomeEvent
  ): Promise<SomeAggregate> {
    const results = await this.repo.query(
      `
            INSERT INTO
                some_table
            (
                "id",
                "valueToUpdate"
            )
                VALUES
            (
                $1,
                $2
            )

            ON CONFLICT( "id" )
                DO UPDATE
                    SET
                        "valueToUpdate" = $2
                    WHERE
                        "some_table"."id" = $1

            RETURNING *
        `,
      [event.id, event.valueToUpdate]
    );

    return results[0];
  }
}

@Entity()
export class SomeAggregate {
  @PrimaryColumn("uuid")
  public id: string;

  @Column("text")
  public valueToUpdate?: string;

  @Column("text")
  public anotherValue?: string;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  public modifiedAt?: Date;
}

export interface ISomeEvent {
  id: string;
  valueToUpdate: string;
}
