import { CommentModel } from "../models/CommentModel";
import { TaskModel } from "../models/TaskModel";
import { UserModel } from "../models/UserModel";
import { IComment } from "@commonTypes/Comment";
import { User } from "@commonTypes/User";
import { Task } from "@commonTypes/Task";

export const commentController = {
  createComment: async (userId: string, taskId: string, comment: IComment) => {
    const findedUser: User = await UserModel.findOne({ _id: userId });
    const findedTask: Task = await TaskModel.findOne({
      _id: taskId,
    });

    if (findedUser && findedTask) {
      const newComment = await CommentModel.create({
        authorId: userId,
        taskId,
        author: findedUser.name,
        createdAt: new Date(Date.now()),
        ...comment,
      });

      await TaskModel.updateOne(
        { _id: taskId },
        { $push: { comments: newComment._id } },
      );

      return newComment;
    }

    return null;
  },

  deleteComment: async (userId: string, commentId: string) => {
    const findedUser: User = await UserModel.findOne({ _id: userId });
    const findedComment: Task = await CommentModel.findOne({
      _id: commentId,
    });

    if (findedUser && findedComment) {
      await TaskModel.findOneAndUpdate(
        { comments: commentId },
        { $pull: { comments: commentId } },
      );

      const deletedComment = await CommentModel.deleteOne({ _id: commentId });

      return !!deletedComment;
    }
    return false;
  },
};
