//global imports
import colors from "colors";
import cors from "cors";
import express from "express";
import "reflect-metadata";
import "dotenv/config";

//schema

//connect DB

const PORT = process.env.PORT || 5000;

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

    //graphql server

    //graphql middleware

    //listen
    app.listen(PORT, () => {
      console.log(
        colors.bgBlue(`🚀 Server startet auf Port http://localhost:${PORT} 🚀`)
      );
    });
  } catch (error) {
    console.log(error);
  }
}
createServer();
