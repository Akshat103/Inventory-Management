const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
try {
  mongoose.connect("mongodb://127.0.0.1:27017/e-commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Database Connected Successfully");
} catch (err) {
  console.log("Database Not Connected");
}
