require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;
const userRouter = require("./router/user.route");
const cors = require('cors')
app.use(express.json());
app.use(cors({
    origin: "*"
}))
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MOGNO DB CONNECTED!!!"))
    .catch((err) => console.log("MONGO DB ERROR", err));
  console.log(`Server has been started on PORT: http://localhost:${PORT}`);
});
