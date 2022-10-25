const mongoose = require("mongoose");

//TODO да се промени адреса според задачата
const CONNECTION_STRING = "mongodb://localhost:27017/bookinguni";

module.exports = async (app) => {
  try {
    await mongoose.connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected!')
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
