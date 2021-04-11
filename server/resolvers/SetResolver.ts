import { ObjectId } from "mongodb";
import {
  Resolver,
  Arg,
  Ctx,
  UseMiddleware,
  Query,
  Mutation,
  FieldResolver,
  Root,
} from "type-graphql";
//Models
import { Exercise, ExerciseModel } from "../entity/Exercise";
import { Set, SetModel } from "../entity/Set";
import { isAuth } from "../middleware/isAuth";
import { ObjectIdScalar } from "../schema/object-id.scalar";
import { MyContext } from "../types/MyContext";
import { ExerciseInput } from "../types/ExerciseInput";
import { SetInput } from "../types/SetInput";

@Resolver(() => Set)
export class SetResolver {
  //MKT read all workouts for an user PRIVATE
  @Query(() => [Set])
  @UseMiddleware(isAuth)
  async readSets(): Promise<Set[]> {
    return await SetModel.find({}).sort({
      createdAt: -1,
    });
  }
  //MKT read a workout by ID PRIVATE
  @Query(() => Set)
  @UseMiddleware(isAuth)
  async readSet(
    @Arg("setId", () => ObjectIdScalar) setId: ObjectId
  ): Promise<Set> {
    const set = await SetModel.findById(setId);
    if (!set) throw new Error("Diesen Satz gibt es nicht!");

    return set;
  }
  //MKT create a workout for an User PRIVATE
  @Mutation(() => Set)
  @UseMiddleware(isAuth)
  async createSet(
    @Arg("setInput") setInput: SetInput
    // @Ctx() ctx: MyContext
  ): Promise<Set> {
    const exercise = await ExerciseModel.findById(setInput.exercise);

    const set = new SetModel({
      ...setInput,
      exercise,
    } as Set);
    await set.save();
    return set;
  }
  //   //MKT update Workoutname PRIVATE
  //   @Mutation(() => Exercise)
  //   @UseMiddleware(isAuth)
  //   async updateExercise(
  //     @Arg("exerciseInput") exerciseInput: ExerciseInput
  //   ): Promise<Exercise> {
  //     const exercise = await ExerciseModel.findById(exerciseInput._id);
  //     if (!exercise) throw new Error("Diese Einheit gibt es nicht!");

  //     const updateExercise = await ExerciseModel.findOneAndUpdate(
  //       { _id: exerciseInput._id },
  //       {
  //         $set: {
  //           name: exerciseInput.name,
  //           category: exerciseInput.category,
  //           //TODO change set
  //         },
  //       },
  //       { new: true, runValidators: true }
  //     );
  //     //! Could be null therefor we need to tell typescript that
  //     if (!updateExercise) throw new Error("Fehler beim Änder");
  //     return updateExercise;
  //   }
  //   //MKT delete Exercise by ID PRIVATE
  //   @Mutation(() => Boolean)
  //   @UseMiddleware(isAuth)
  //   async deleteExercise(
  //     @Arg("exerciseId", () => ObjectIdScalar) exerciseId: ObjectId
  //   ): Promise<Boolean> {
  //     const exercise = await ExerciseModel.findById(exerciseId);
  //     if (!exercise) throw new Error("Diese Einheit gibt es nicht!");

  //     await exercise.remove();
  //     return true;
  //   }

  //MKT create Reference to exercise
  @FieldResolver()
  async exercise(@Root() set: Set): Promise<Exercise | null> {
    return await ExerciseModel.findById(set.exercise);
  }
  //   //MKT ref to user
  //   @FieldResolver()
  //   async athlete(@Root() exercise: Exercise): Promise<User | null> {
  //     return await UserModel.findById(exercise.athlete);
  //   }
}
