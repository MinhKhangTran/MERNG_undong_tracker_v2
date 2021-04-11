import { Field, ObjectType } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
//workoutModel als ref
import { Workout } from "./Workout";
import { Set } from "./Set";
import { Ref } from "../types/Ref";

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

  //Reference to a workout ⬆
  @Field(() => Workout)
  @Property({ required: false, ref: "Workout" })
  workout: Ref<Workout>;
  // //Reference to an user
  // @Field(() => User)
  // @Property({ ref: User, required: true })
  // athlete: Ref<User>;
  //Reference to an Set( an Exercise has many Sets) ⬇
  @Field(() => [Set])
  @Property({ ref: "Set", required: false, default: [] })
  set: Ref<Set>[] | any;
}

export const ExerciseModel = getModelForClass(Exercise, {
  schemaOptions: { timestamps: true },
});
