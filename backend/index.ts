import { connectDB } from "./src/db";
import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import { authController } from "./src/controllers/authController";
import { userController } from "./src/controllers/userController";
import { boardController } from "./src/controllers/boardController";
import { Request } from "express";

dotenv.config();

export const app = express();
const port = 4000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.post("/signIn", async (req, res) => {
  const user = await authController.signIn(req.body);

  res.send(user);
});

app.post("/getUser", async (req, res) => {
  const user = await userController.getUserByEmail(req.body.email);

  res.send({ user });
});

app.get("/tasks/:userId", async (req, res) => {
  const tasks = await boardController.getTasksByUserId(req.params.userId);

  res.send({ tasks });
});

app.post("/tasks/:userId", async (req: Request, res) => {
  const newTask = await boardController.addTask(req.params.userId, req.body);

  res.send(newTask);
});

app.delete("/tasks/:taskId", async (req: Request, res) => {
  const isSuccess = await boardController.deleteTask(req.params.taskId);

  res.send(isSuccess);
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Example app listening at http://localhost:${port}`);
});
