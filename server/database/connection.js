const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);

    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      writeConcern: "majority",
    });

    console.log(`MongoDB connceted: ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
