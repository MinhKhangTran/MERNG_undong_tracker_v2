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
import { User, UserModel } from "../entity/User";
import { Workout, WorkoutModel } from "../entity/Workout";
import { Exercise, ExerciseModel } from "../entity/Exercise";
import { isAuth } from "../middleware/isAuth";
import { ObjectIdScalar } from "../schema/object-id.scalar";
import { MyContext } from "../types/MyContext";
import { ExerciseInput } from "../types/ExerciseInput";

@Resolver(() => Exercise)
export class ExerciseResolver {
  //MKT read all workouts for an user PRIVATE
  @Query(() => [Exercise])
  @UseMiddleware(isAuth)
  async readExercises(): Promise<Exercise[]> {
    return await ExerciseModel.find({}).sort({
      createdAt: -1,
    });
  }
  //MKT read a workout by ID PRIVATE
  @Query(() => Exercise)
  @UseMiddleware(isAuth)
  async readExercise(
    @Arg("exerciseId", () => ObjectIdScalar) exerciseId: ObjectId
  ): Promise<Exercise> {
    const exercise = await ExerciseModel.findById(exerciseId);
    if (!exercise) throw new Error("Diese Einheit gibt es nicht!");

    return exercise;
  }
  //MKT create a workout for an User PRIVATE
  @Mutation(() => Exercise)
  @UseMiddleware(isAuth)
  async createExercise(
    @Arg("exerciseInput") exerciseInput: ExerciseInput
    // @Ctx() ctx: MyContext
  ): Promise<Exercise> {
    const workout = await WorkoutModel.findById(exerciseInput.workout);
    console.log(workout);
    const exercise = new ExerciseModel({
      ...exerciseInput,
      //   athlete: ctx.res.locals.userId,
      workout,
    } as Exercise);
    await exercise.save();
    return exercise;
  }
  //   //MKT update Workoutname PRIVATE
  //   @Mutation(() => Exercise)
  //   @UseMiddleware(isAuth)
  //   async updateWorkout(
  //     @Arg("workoutInput") workoutInput: WorkoutInput,
  //     @Ctx() ctx: MyContext
  //   ): Promise<Exercise> {
  //     const workout = await WorkoutModel.findById(workoutInput._id);
  //     if (!workout) throw new Error("Diese Einheit gibt es nicht!");
  //     if (workout.athlete.toString() !== ctx.res.locals.userId) {
  //       throw new Error("Diese Einheit gehört dir nicht!");
  //     }
  //     const updateWorkout = await WorkoutModel.findOneAndUpdate(
  //       { _id: workoutInput._id },
  //       {
  //         $set: {
  //           name: workoutInput.name,
  //         },
  //       },
  //       { new: true, runValidators: true }
  //     );
  //     //! Could be null therefor we need to tell typescript that
  //     if (!updateWorkout) throw new Error("Fehler beim Änder");
  //     return updateWorkout;
  //   }
  //   //MKT delete Exercise by ID PRIVATE
  //   @Mutation(() => Boolean)
  //   @UseMiddleware(isAuth)
  //   async deleteWorkout(
  //     @Arg("workoutId", () => ObjectIdScalar) workoutId: ObjectId,
  //     @Ctx() ctx: MyContext
  //   ): Promise<Boolean> {
  //     const workout = await WorkoutModel.findById(workoutId);
  //     if (!workout) throw new Error("Diese Einheit gibt es nicht!");
  //     if (workout.athlete.toString() !== ctx.res.locals.userId) {
  //       throw new Error("Diese Einheit gehört dir nicht!");
  //     }
  //     await workout.remove();
  //     return true;
  //   }

  //MKT create Reference to workout
  @FieldResolver()
  async workout(@Root() exercise: Exercise): Promise<Workout | null> {
    return await WorkoutModel.findById(exercise.workout);
  }
  //   //MKT ref to user
  //   @FieldResolver()
  //   async athlete(@Root() exercise: Exercise): Promise<User | null> {
  //     return await UserModel.findById(exercise.athlete);
  //   }
}
