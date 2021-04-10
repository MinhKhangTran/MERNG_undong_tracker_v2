import { ObjectId } from "bson";
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
import { Workout, WorkoutModel } from "../entity/Workout";
import { isAuth } from "../middleware/isAuth";
import { ObjectIdScalar } from "../schema/object-id.scalar";
import { MyContext } from "../types/MyContext";
import { WorkoutInput } from "../types/WorkoutInput";

@Resolver(() => Workout)
export class WorkoutResolver {
  //? read all workouts for an user PRIVATE
  @Query(() => [Workout])
  @UseMiddleware(isAuth)
  async readWorkouts(@Ctx() ctx: MyContext): Promise<Workout[]> {
    return await WorkoutModel.find({ athlete: ctx.res.locals.userId }).sort({
      createdAt: -1,
    });
  }
  //? read a workout by ID PRIVATE
  @Query(() => Workout)
  @UseMiddleware(isAuth)
  async readWorkout(
    @Arg("workoutId", () => ObjectIdScalar) workoutId: ObjectId,
    @Ctx() ctx: MyContext
  ): Promise<Workout> {
    const workout = await WorkoutModel.findById(workoutId);
    if (!workout) throw new Error("Diese Einheit gibt es nicht!");
    const sameUser: boolean =
      workout.athlete.toString() === ctx.res.locals.userId;
    if (!sameUser) {
      throw new Error("Diese Einheit gehört dir nicht!");
    }
    return workout;
  }
  //? create a workout for an User PRIVATE
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
}
