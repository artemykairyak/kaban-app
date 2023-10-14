import mongoose, { Model, model, Schema, Types } from "mongoose";
import { Task } from "@commonTypes/Task";

interface DbTask extends Task {
  userId: Types.ObjectId;
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

taskSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const TaskModel: Model<DbTask> = model("Task", taskSchema);
