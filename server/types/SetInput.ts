import { InputType, Field } from "type-graphql";
import { ObjectId } from "mongodb";
//Exercise
import { Set } from "../entity/Set";

@InputType()
export class SetInput implements Partial<Set> {
  @Field({ nullable: true })
  _id?: ObjectId;
  @Field({ nullable: true })
  exercise?: ObjectId;
  //   @Field({ nullable: true })
  //   athlete: ObjectId;

  @Field()
  wdh: number;
  @Field()
  gewicht: number;
}
