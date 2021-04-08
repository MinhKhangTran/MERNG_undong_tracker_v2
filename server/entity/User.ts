import { ObjectType, Field } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

@ObjectType({ description: "User" })
export class User {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true, lowercase: true })
  username: string;

  @Field()
  @Property({ required: true, unique: true, lowercase: true })
  email: string;

  //nicht sichtbar in graphql => kein Field
  @Property({ required: true })
  password: string;
}

//export model for class
export const UserModel = getModelForClass(User);
