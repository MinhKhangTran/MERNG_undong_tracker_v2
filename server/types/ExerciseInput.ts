import { InputType, Field } from "type-graphql";
import { ObjectId } from "mongodb";
//Exercise
import { Exercise } from "../entity/Exercise";

@InputType()
export class ExerciseInput implements Partial<Exercise> {
  @Field({ nullable: true })
  _id?: ObjectId;
  @Field({ nullable: true })
  workout?: ObjectId;
  //   @Field({ nullable: true })
  //   athlete: ObjectId;
  @Field()
  name: string;
  @Field()
  category:
    | "Brust"
    | "Beine"
    | "Rücken"
    | "Unterer Rücken"
    | "Arme"
    | "Schulter";
}
