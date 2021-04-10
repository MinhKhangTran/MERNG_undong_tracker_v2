//Global
import { Resolver, Query, UseMiddleware, Arg, Ctx } from "type-graphql";
import { ObjectId } from "mongodb";
import { User, UserModel } from "../entity/User";
//types
import { MyContext } from "../types/MyContext";
import { ObjectIdScalar } from "../schema/object-id.scalar";
//middleware
import { isAuth } from "../middleware/isAuth";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  //MKT get User (Test)
  async user(@Arg("userId", () => ObjectIdScalar) userId: ObjectId) {
    return await UserModel.findById(userId);
  }
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  //MKT get logged User
  async getLoggedUser(@Ctx() ctx: MyContext): Promise<User | null> {
    return await UserModel.findById(ctx.res.locals.userId);
  }
}
