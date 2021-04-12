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
import { Set, SetModel } from "../entity/Set";

@Resolver(() => Exercise)
export class ExerciseResolver {
  //MKT read all exercises of a workout for an user PRIVATE
  @Query(() => [Exercise])
  @UseMiddleware(isAuth)
  async readExercises(
    @Arg("workoutId", () => ObjectIdScalar) workoutId: ObjectId
  ): Promise<Exercise[]> {
    return await ExerciseModel.find({ workout: workoutId }).sort({
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

    console.log(exercise);

    return exercise;
  }
  //MKT create an Exercise for an User PRIVATE
  @Mutation(() => Exercise)
  @UseMiddleware(isAuth)
  async createExercise(
    @Arg("exerciseInput") exerciseInput: ExerciseInput
    // @Ctx() ctx: MyContext
  ): Promise<Exercise> {
    const workout = await WorkoutModel.findById(exerciseInput.workout);
    // console.log(workout);
    const exercise = new ExerciseModel({
      ...exerciseInput,
      //   athlete: ctx.res.locals.userId,
      set: [],
      workout,
    } as Exercise);
    await exercise.save();
    return exercise;
  }
  //MKT update Workoutname PRIVATE
  @Mutation(() => Exercise)
  @UseMiddleware(isAuth)
  async updateExercise(
    @Arg("exerciseInput") exerciseInput: ExerciseInput
  ): Promise<Exercise> {
    const exercise = await ExerciseModel.findById(exerciseInput._id);
    if (!exercise) throw new Error("Diese Einheit gibt es nicht!");

    const updateExercise = await ExerciseModel.findOneAndUpdate(
      { _id: exerciseInput._id },
      {
        $set: {
          name: exerciseInput.name,
          category: exerciseInput.category,
          //TODO change set
        },
      },
      { new: true, runValidators: true }
    );
    //! Could be null therefore we need to tell typescript that
    if (!updateExercise) throw new Error("Fehler beim Änder");
    return updateExercise;
  }
  //MKT delete Exercise by ID PRIVATE
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteExercise(
    @Arg("exerciseId", () => ObjectIdScalar) exerciseId: ObjectId
  ): Promise<Boolean> {
    const exercise = await ExerciseModel.findById(exerciseId);
    if (!exercise) throw new Error("Diese Einheit gibt es nicht!");

    await exercise.remove();
    return true;
  }

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
  //MKT create Reference to Set
  @FieldResolver()
  async set(@Root() exercise: Exercise): Promise<Set[] | null> {
    return await SetModel.find({ exercise: exercise._id });
  }
}
