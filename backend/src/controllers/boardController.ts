import { TaskModel } from "../models/TaskModel";
import { UserModel } from "../models/UserModel";
import { Task } from "@commonTypes/Task";

export const boardController = {
  getTasksByUserId: async (userId: string) => {
    if (userId) {
      return TaskModel.find({ userId }).sort({ order: 1 });
    }

    return [];
  },
  addTask: async (userId: string, task: Task) => {
    const isUserExist = await UserModel.findOne({ _id: userId });

    if (isUserExist) {
      return await TaskModel.create({ userId, ...task });
    }
  },
  updateTask: async (userId: string, taskId: string, task: Task) => {
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
        console.log("< INDEX");
        const filter = { order: { $gte: task.order }, status: task.status };
        const update = { $inc: { order: 1 } };

        await TaskModel.updateMany(filter, update);
        await TaskModel.updateOne({ userId, _id: taskId }, task);
        return !!prevTask;
      }

      if (task.order > prevTask.order) {
        console.log("> INDEX");
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

    return !!deletedTask;
  },
};
