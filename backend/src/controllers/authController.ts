import { User } from "@commonTypes/User";
import { UserModel } from "../models/UserModel";

export const authController = {
  signIn: async (user: User) => {
    const isUserExist = await UserModel.findOne({ email: user.email });

    if (!isUserExist) {
      const newUser = await UserModel.create({
        email: user.email,
        name: user.name,
        image: user.image,
      });

      return { user: newUser };
    }

    return { token: "", user };
  },
};
