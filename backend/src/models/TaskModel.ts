import mongoose, { Model, model, Schema, Types } from "mongoose";
import { Task } from "@commonTypes/Task";

export interface DbTask extends Task {
  userId: Types.ObjectId;
  projectId: Types.ObjectId;
}

const taskSchema: Schema<DbTask> = new Schema({
  status: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  color: {
    type: String,
  },
  list: {
    type: Object,
  },
  order: {
    type: Number,
  },
  createdAt: {
    type: Date,
  },
  priority: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

taskSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const TaskModel: Model<DbTask> = model("Task", taskSchema);
