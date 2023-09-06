const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();
dotenv.config();
const port = process.env.SERVER_PORT;
const userRouter = require("./api/users/user.router");
const questionRouter = require("./api/questions/question.router");
const answerRouter = require("./api/answers/answer.router");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/answers", answerRouter);

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
