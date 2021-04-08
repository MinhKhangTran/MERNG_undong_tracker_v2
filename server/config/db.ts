import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => {
  try {
    const verbindung = await mongoose.connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(
      colors.bgMagenta(
        `🤓 Verbunden mit der DB ${verbindung.connection.host} 🤓`
      )
    );
  } catch (error) {
    console.log(colors.bgRed.bold(`😩 Error: ${error} 😩`));
    process.exit();
  }
};
