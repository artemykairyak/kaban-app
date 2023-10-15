import { Model, model, Schema } from "mongoose";
import { User } from "@commonTypes/User";

const userSchema: Schema<User> = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  image: {
    type: String,
  },
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const UserModel: Model<User> = model("User", userSchema);
