import mongoose, { Model, model, Schema, Types } from "mongoose";
import { User } from "@commonTypes/User";
import { Project } from "@commonTypes/Project";

interface DbProject extends Project {
  userId: Types.ObjectId;
}

const projectSchema: Schema<DbProject> = new Schema({
  title: {
    type: String,
  },
  color: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

projectSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const ProjectModel: Model<DbProject> = model("Project", projectSchema);
