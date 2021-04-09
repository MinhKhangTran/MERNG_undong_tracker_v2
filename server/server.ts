//global imports
import colors from "colors";
import cors from "cors";
import express from "express";
import "reflect-metadata";
import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
//connect DB
import { connectDB } from "./config/db";

//schema
import createSchema from "./schema";

const PORT = process.env.PORT || 5000;

connectDB();
//create Server
async function createServer() {
  try {
    //create app
    const app = express();

    //using middleware (Cors, Json)
    const corsOptions = {
      credentials: true,
      origin: "http://localhost:3000",
    };
    app.use(cors(corsOptions));
    app.use(express.json());

    //buildschema
    const schema = await createSchema();
    // create GraphQL server
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      introspection: true,
      // enable GraphQL Playground
      playground: {
        settings: {
          "request.credentials": "include",
        },
      },
    });

    apolloServer.applyMiddleware({ app, cors: corsOptions });

    //listen
    app.listen(PORT, () => {
      console.log(
        colors.bgBlue(
          `🚀 Server rennt auf dem Port http://localhost:${PORT}${apolloServer.graphqlPath} 🚀`
        )
      );
    });
  } catch (error) {
    console.log(error);
  }
}
createServer();
