//global imports
import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { ObjectId } from "mongodb";
import path from "path";

//import Resolvers
import { AuthResolver } from "../resolvers/AuthResolver";
import { UserResolver } from "../resolvers/UserResolver";

//middleware and Scalars
import { TypegooseMiddleware } from "../middleware/typegoose";
import { ObjectIdScalar } from "./object-id.scalar";
import { WorkoutResolver } from "../resolvers/WorkoutResolver";
import { ExerciseResolver } from "../resolvers/ExerciseResolver";

//build schema
export default async function createSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    // add ts resolvers as Array
    // * Resolver needs both Query and Mutation!
    resolvers: [AuthResolver, UserResolver, WorkoutResolver, ExerciseResolver],
    //for creating schemafile with generator
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    //use document converting middleware
    globalMiddlewares: [TypegooseMiddleware],
    //use Object id scalar mapping
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
  });
  return schema;
}
