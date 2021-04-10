//global
import { ObjectType, Field } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
//ref and ref Model
import { User } from "./User";
import { Ref } from "../types/Ref";

@ObjectType({ description: "Workout" })
export class Workout {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true, trim: true, lowercase: true })
  name: string;

  //Reference to an user
  @Field(() => User)
  @Property({ ref: User, required: true })
  athlete: Ref<User>;
}

export const WorkoutModel = getModelForClass(Workout);
