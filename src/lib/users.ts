import { User } from "@/model/user-model";

export interface UserType {
  email: string;
  password: string;
  name?: string;
}

export async function createUser(user: UserType) {
  try {
    await User.create(user);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Caught an Error:", error.message);
    } else {
      throw new Error("Error");
    }
  }
}

export async function findUserByEmail(email: string) {
  try {
    return await User.findOne({ email });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Caught an Error while searching user:", error.message);
    } else {
      throw new Error("Unknown error while searching user.");
    }
  }
}
