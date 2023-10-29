import mongoose, { Model, model, Schema, Types } from "mongoose";
import { User } from "@commonTypes/User";
import { IComment } from "@commonTypes/Comment";

interface DbComment extends IComment {
  authorId: Types.ObjectId;
  taskId: Types.ObjectId;
}

const commentSchema: Schema<DbComment> = new Schema({
  text: {
    type: String,
  },
  author: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
});

commentSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const CommentModel: Model<DbComment> = model("Comment", commentSchema);
