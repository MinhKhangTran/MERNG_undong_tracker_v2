import { InputType, Field } from "type-graphql";
import { ObjectId } from "mongodb";
//Exercise
import { Exercise } from "../entity/Exercise";
import { Set } from "../entity/Set";

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
  // @Field(() => [Set], { nullable: true })
  // set?: Set[];
}
@InputType()
export class NewExerciseInput implements Partial<Exercise> {
  @Field({ nullable: true })
  _id?: ObjectId;
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
  // @Field(() => [Set], { nullable: true })
  // set?: Set[];
}
