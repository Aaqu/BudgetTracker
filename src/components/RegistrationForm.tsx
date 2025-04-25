"use client";

import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

export const RegistrationForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const formData = new FormData(event.currentTarget);

      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.status === 201) {
        router.push("/");
      } else if (response.status === 409) {
        setError("User with this email already exists.");
      } else {
        const errorText = await response.text();
        setError(errorText || "Registration failed.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Caught an Error:", error.message);
        setError("Unexpected error occurred.");
      } else {
        throw new Error("Unknown error occurred.");
      }
    }
  };

  return (
    <>
      <div className="text-xl text-red-500 mb-4">{error}</div>
      <form
        onSubmit={handleSubmit}
        className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
      >
        <div className="my-2">
          <label htmlFor="name">Name</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="text"
            name="name"
            id="name"
          />
        </div>

        <div className="my-2">
          <label htmlFor="email">Email Address</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div className="my-2">
          <label htmlFor="password">Password</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36"
        >
          Register
        </button>
      </form>
    </>
  );
};
