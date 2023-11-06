import { TaskModel } from "../models/TaskModel";
import { UserModel } from "../models/UserModel";
import { Task } from "@commonTypes/Task";
import { ProjectModel } from "../models/ProjectModel";
import { CommentModel } from "../models/CommentModel";

export const boardController = {
  getTasksByProjectId: async (userId: string, projectId: string) => {
    if (userId && projectId) {
      return TaskModel.find({ userId, projectId }).sort({ order: 1 });
    }

    return [];
  },
  getTaskById: async (userId: string, taskId: string) => {
    if (userId && taskId) {
      return await TaskModel.findOne({ userId, _id: taskId })
        .populate({
          path: "comments",
          model: "Comment",
          populate: {
            path: "author",
          },
        })
        .exec();
    }

    return null;
  },
  addTask: async (userId: string, projectId: string, task: Task) => {
    const isUserExist = await UserModel.findOne({ _id: userId });
    const isProjectExists = await ProjectModel.findOne({ _id: projectId });

    if (isUserExist && isProjectExists) {
      return await TaskModel.create({ userId, projectId, ...task });
    }
  },
  updateTask: async (userId: string, taskId: string, task: Task) => {
    delete task.comments;
    const prevTask: Record<string, any> = await TaskModel.findOne({
      userId,
      _id: taskId,
    });

    if (prevTask.status !== task.status) {
      const oldColFilter = {
        order: { $gt: prevTask.order },
        status: prevTask.status,
      };
      const oldColUpdate = { $inc: { order: -1 } };

      await TaskModel.updateMany(oldColFilter, oldColUpdate);

      const newColFilter = {
        order: { $gte: task.order },
        status: task.status,
      };
      const newColUpdate = { $inc: { order: 1 } };

      await TaskModel.updateMany(newColFilter, newColUpdate);
      await TaskModel.updateOne({ userId, _id: taskId }, task);
    } else {
      if (task.order < prevTask.order) {
        const filter = { order: { $gte: task.order }, status: task.status };
        const update = { $inc: { order: 1 } };

        await TaskModel.updateMany(filter, update);
        await TaskModel.updateOne({ userId, _id: taskId }, task);
        return !!prevTask;
      }

      if (task.order > prevTask.order) {
        const filter = { order: { $lte: task.order }, status: task.status };
        const update = { $inc: { order: -1 } };

        await TaskModel.updateMany(filter, update);
        await TaskModel.updateOne({ userId, _id: taskId }, task);

        return !!prevTask;
      }
    }

    await TaskModel.updateOne({ userId, _id: taskId }, task);

    return !!prevTask;
  },
  deleteTask: async (taskId: string) => {
    const deletedTask = await TaskModel.deleteOne({ _id: taskId });
    await CommentModel.deleteMany({ taskId });

    return !!deletedTask;
  },
};
