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
import { isAuth } from "../middleware/isAuth";
import { ObjectIdScalar } from "../schema/object-id.scalar";
import { MyContext } from "../types/MyContext";
import { WorkoutInput } from "../types/WorkoutInput";

@Resolver(() => Workout)
export class WorkoutResolver {
  //MKT read all workouts for an user PRIVATE
  @Query(() => [Workout])
  @UseMiddleware(isAuth)
  async readWorkouts(@Ctx() ctx: MyContext): Promise<Workout[]> {
    return await WorkoutModel.find({ athlete: ctx.res.locals.userId }).sort({
      createdAt: -1,
    });
  }
  //MKT read a workout by ID PRIVATE
  @Query(() => Workout)
  @UseMiddleware(isAuth)
  async readWorkout(
    @Arg("workoutId", () => ObjectIdScalar) workoutId: ObjectId,
    @Ctx() ctx: MyContext
  ): Promise<Workout> {
    const workout = await WorkoutModel.findById(workoutId);
    if (!workout) throw new Error("Diese Einheit gibt es nicht!");

    if (workout.athlete.toString() !== ctx.res.locals.userId) {
      throw new Error("Diese Einheit gehört dir nicht!");
    }
    return workout;
  }
  //MKT create a workout for an User PRIVATE
  @Mutation(() => Workout)
  @UseMiddleware(isAuth)
  async createWorkout(
    @Arg("workoutInput") workoutInput: WorkoutInput,
    @Ctx() ctx: MyContext
  ): Promise<Workout> {
    const workout = new WorkoutModel({
      ...workoutInput,
      athlete: ctx.res.locals.userId,
    } as Workout);
    await workout.save();
    return workout;
  }
  //MKT update Workoutname PRIVATE
  @Mutation(() => Workout)
  @UseMiddleware(isAuth)
  async updateWorkout(
    @Arg("workoutInput") workoutInput: WorkoutInput,
    @Ctx() ctx: MyContext
  ): Promise<Workout> {
    const workout = await WorkoutModel.findById(workoutInput._id);
    if (!workout) throw new Error("Diese Einheit gibt es nicht!");
    if (workout.athlete.toString() !== ctx.res.locals.userId) {
      throw new Error("Diese Einheit gehört dir nicht!");
    }
    const updateWorkout = await WorkoutModel.findOneAndUpdate(
      { _id: workoutInput._id },
      {
        $set: {
          name: workoutInput.name,
        },
      },
      { new: true, runValidators: true }
    );
    //! Could be null therefor we need to tell typescript that
    if (!updateWorkout) throw new Error("Fehler beim Änder");
    return updateWorkout;
  }
  //MKT delete Workout by ID PRIVATE
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteWorkout(
    @Arg("workoutId", () => ObjectIdScalar) workoutId: ObjectId,
    @Ctx() ctx: MyContext
  ): Promise<Boolean> {
    const workout = await WorkoutModel.findById(workoutId);
    if (!workout) throw new Error("Diese Einheit gibt es nicht!");
    if (workout.athlete.toString() !== ctx.res.locals.userId) {
      throw new Error("Diese Einheit gehört dir nicht!");
    }
    await workout.remove();
    return true;
  }

  //MKT create Reference
  @FieldResolver()
  async athlete(@Root() workout: Workout): Promise<User | null> {
    return await UserModel.findById(workout.athlete);
  }
}
