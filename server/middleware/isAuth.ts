import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/MyContext";
import jwt from "jsonwebtoken";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  try {
    const token = authorization?.replace("Bearer ", "");
    const user = jwt.verify(token!, `${process.env.JWT_SECRET}`) as any;
    //im context speichern
    context.res.locals.userId = user.id;
    return next();
  } catch (error) {
    throw new Error(error.message);
  }
};
