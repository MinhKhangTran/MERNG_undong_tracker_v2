//Global
import { Resolver, Arg, Mutation } from "type-graphql";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//types
import { LoginInput, RegisterInput } from "../types/AuthInput";
import { UserResponse } from "../types/UserResponse";

//Model
import { UserModel } from "../entity/User";

@Resolver()
export class AuthResolver {
  //?register a new User
  @Mutation(() => UserResponse)
  async register(
    @Arg("input") { username, email, password }: RegisterInput
  ): Promise<UserResponse> {
    const user = await UserModel.findOne({ email });
    if (user) {
      throw new Error("dieser User ist schon angemeldet!");
    }
    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create new User
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      username,
    });
    await newUser.save();
    //generate Token
    const token = jwt.sign({ id: newUser.id }, `${process.env.JWT_SECRET}`, {
      expiresIn: "7d",
    });

    return { user: newUser, token };
  }
  //?login a User
  @Mutation(() => UserResponse)
  async login(
    @Arg("input") { email, password }: LoginInput
  ): Promise<UserResponse> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("dieser User ist noch nicht angemeldet!");
    }
    //compare password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Falsches Passwort");
    }
    //generate Token
    const token = jwt.sign({ id: user.id }, `${process.env.JWT_SECRET}`, {
      expiresIn: "7d",
    });

    return { user, token };
  }
}
