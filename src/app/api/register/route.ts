import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongo";
import { createUser, findUserByEmail } from "@/lib/users";

export const POST = async (request: NextRequest) => {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return new NextResponse("Missing required fields.", { status: 400 });
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return new NextResponse("Email is already in use.", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    await createUser(newUser);

    return new NextResponse("User has been created.", { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("POST /users error:", error.message);
      return new NextResponse(error.message, { status: 500 });
    } else {
      console.error("POST /users unknown error.");
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
};
