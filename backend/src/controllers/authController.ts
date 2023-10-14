import { User } from "@commonTypes/User";
import { UserModel } from "../models/UserModel";
import * as jwt from "jsonwebtoken";

export const authController = {
  signIn: async (user: User) => {
    console.log("user", user);
    const isUserExist = await UserModel.findOne({ email: user.email });

    console.log("EXIS user", isUserExist);

    if (!isUserExist) {
      console.log("bef");
      const newUser = await UserModel.create({
        email: user.email,
        name: user.name,
        picture: user.picture,
      });

      console.log("after", newUser);

      const token = jwt.sign(
        { email: newUser.email, id: newUser._id.toString() },
        "secret",
        {
          expiresIn: "1h",
        },
      );

      console.log("TOKEN", token);
      return { token, user: newUser };
    }

    return { token: "", user };
  },
};
