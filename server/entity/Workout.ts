//global
import { ObjectType, Field } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
//ref and ref Model
import { User } from "./User";
import { Ref } from "../types/Ref";
import { Exercise } from "./Exercise";

@ObjectType({ description: "Workout" })
export class Workout {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true, trim: true, lowercase: true })
  name: string;

  @Field()
  @Property({ required: false })
  datum: string;

  //Reference to an user (User has many Workouts) ⬆
  @Field(() => User)
  @Property({ ref: User, required: true })
  athlete: Ref<User>;
  //Reference to an exercise( an Workout hast many Exercises) ⬇
  @Field(() => [Exercise])
  @Property({ ref: "Exercise" })
  exercise: Ref<Exercise>[];
}

export const WorkoutModel = getModelForClass(Workout, {
  schemaOptions: { timestamps: true },
});
