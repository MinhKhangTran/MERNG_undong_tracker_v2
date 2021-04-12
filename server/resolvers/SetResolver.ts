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
  //MKT update Workoutname PRIVATE
  @Mutation(() => Set)
  @UseMiddleware(isAuth)
  async updateSet(@Arg("setInput") setInput: SetInput): Promise<Set> {
    const set = await SetModel.findById(setInput._id);
    if (!set) throw new Error("Dieser Satz gibt es nicht!");

    const updateSet = await SetModel.findOneAndUpdate(
      { _id: setInput._id },
      {
        $set: {
          gewicht: setInput.gewicht,
          wdh: setInput.wdh,
          //TODO change set
        },
      },
      { new: true, runValidators: true }
    );
    //! Could be null therefore we need to tell typescript that
    if (!updateSet) throw new Error("Fehler beim Änder");
    return updateSet;
  }
  //MKT delete Exercise by ID PRIVATE
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteSet(
    @Arg("setId", () => ObjectIdScalar) setId: ObjectId
  ): Promise<Boolean> {
    const set = await SetModel.findById(setId);
    if (!set) throw new Error("Dieser Satz gibt es nicht!");

    await set.remove();
    return true;
  }

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
