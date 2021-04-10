import { InputType, Field } from "type-graphql";
import { ObjectId } from "mongodb";
//Workout
import { Workout } from "../entity/Workout";

@InputType()
export class WorkoutInput implements Partial<Workout> {
  @Field({ nullable: true })
  _id?: ObjectId;
  @Field()
  name: string;
}
