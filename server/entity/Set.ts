import { ObjectType, Field } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
//Model and ref
import { Exercise } from "./Exercise";
import { Ref } from "../types/Ref";

@ObjectType({ description: "Set" })
export class Set {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  wdh: number;

  @Field()
  @Property({ required: true })
  gewicht: number;

  //Reference to Exercise ⬆
  @Field(() => Exercise)
  @Property({ required: true, ref: "Exercise" })
  exercise: Ref<Exercise>;
}

export const SetModel = getModelForClass(Set, {
  schemaOptions: { timestamps: true },
});
