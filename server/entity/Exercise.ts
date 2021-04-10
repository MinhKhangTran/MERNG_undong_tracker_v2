import { Field, ObjectType } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
//workoutModel als ref
import { Workout } from "./Workout";
import { Ref } from "../types/Ref";
import { User } from "./User";

@ObjectType({ description: "Exercise" })
export class Exercise {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true, trim: true, lowercase: true })
  name: string;

  @Field()
  @Property({ required: true })
  category: string;

  //Reference to a workout
  @Field(() => Workout)
  @Property({ required: false, ref: "Workout" })
  workout: Ref<Workout>;
  // //Reference to an user
  // @Field(() => User)
  // @Property({ ref: User, required: true })
  // athlete: Ref<User>;
}

export const ExerciseModel = getModelForClass(Exercise, {
  schemaOptions: { timestamps: true },
});
