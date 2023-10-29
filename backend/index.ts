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
import { commentController } from "./src/controllers/commentController";
import { projectController } from "./src/controllers/projectController";

dotenv.config();

export const app = express();
const port = 4000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// user

app.post("/signIn", async (req, res) => {
  const user = await authController.signIn(req.body);

  res.send(user);
});

app.post("/getUser", async (req, res) => {
  const user = await userController.getUserByEmail(req.body.email);

  res.send({ user });
});

// tasks

app.get("/tasks/:userId", async (req, res) => {
  const projectId = req.query.projectId as string;
  const taskId = req.query.taskId as string;

  if (projectId) {
    const tasks = await boardController.getTasksByProjectId(
      req.params.userId,
      projectId,
    );
    res.send({ isSuccess: !!tasks, data: tasks });
  }

  if (taskId) {
    const task = await boardController.getTaskById(req.params.userId, taskId);

    res.send({ isSuccess: !!task, data: task });
  }
});

app.post("/tasks/:userId/:projectId", async (req: Request, res) => {
  const { userId, projectId } = req.params;
  const newTask = await boardController.addTask(userId, projectId, req.body);

  res.send(newTask);
});

app.put("/tasks/:userId/:taskId", async (req: Request, res) => {
  const { userId, taskId } = req.params;
  const newTask = await boardController.updateTask(userId, taskId, req.body);

  res.send(newTask);
});

app.delete("/tasks/:taskId", async (req: Request, res) => {
  const isSuccess = await boardController.deleteTask(req.params.taskId);

  res.send({ isSuccess, data: null });
});

// comments

app.post("/comments/:userId/:taskId", async (req: Request, res) => {
  const { userId, taskId } = req.params;

  const newComment = await commentController.createComment(
    userId,
    taskId,
    req.body,
  );

  res.send({ isSuccess: !!newComment, data: newComment });
});

app.delete("/comments/:userId/:commentId", async (req: Request, res) => {
  const { userId, commentId } = req.params;

  const isSuccess = await commentController.deleteComment(userId, commentId);

  res.send({ isSuccess, data: null });
});

// projects

app.get("/projects/:userId", async (req, res) => {
  const projects = await projectController.getProjectsByUserId(
    req.params.userId,
  );

  res.send(projects);
});

app.post("/projects/:userId", async (req, res) => {
  const project = await projectController.createProject(
    req.params.userId,
    req.body,
  );

  res.send({ isSuccess: !!project, data: project });
});

app.put("/projects/:projectId", async (req, res) => {
  const { projectId } = req.params;

  const project = await projectController.editProject(projectId, req.body);

  res.send({ isSuccess: !!project, data: project });
});

app.delete("/projects/:projectId", async (req: Request, res) => {
  const { projectId } = req.params;

  const isSuccess = await projectController.deleteProject(projectId);

  res.send({ isSuccess, data: null });
});

app.listen(port, async () => {
  await connectDB();
  console.log(`Example app listening at http://localhost:${port}`);
});
