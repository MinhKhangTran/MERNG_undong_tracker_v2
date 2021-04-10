import { InputType, Field } from "type-graphql";
import { ObjectId } from "mongodb";
//Workout
import { Workout } from "../entity/Workout";
import { Exercise } from "../entity/Exercise";

@InputType()
export class WorkoutInput implements Partial<Workout> {
  @Field({ nullable: true })
  _id?: ObjectId;
  @Field()
  name: string;
  // @Field({ nullable: true })
  // exercise?: Exercise[];
}
