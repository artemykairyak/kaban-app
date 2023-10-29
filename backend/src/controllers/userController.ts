import { UserModel } from "../models/UserModel";

export const userController = {
  getUserByEmail: async (email: string) => {
    return UserModel.findOne({ email });
  },
};
