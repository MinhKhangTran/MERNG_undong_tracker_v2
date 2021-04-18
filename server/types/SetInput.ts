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

  @Field({ nullable: true })
  wdh?: number;
  @Field({ nullable: true })
  gewicht?: number;
  @Field({ nullable: true })
  text?: string;
}
