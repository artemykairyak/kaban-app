import { UserModel } from "../models/UserModel";

export const userController = {
  getUserByEmail: async (email: string) => {
    console.log("email", email);

    return UserModel.findOne({ email });
  },
};
