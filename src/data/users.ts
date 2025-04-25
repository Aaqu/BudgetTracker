const users = [
  {
    email: "admin@example.com",
    password: "password",
  },
];

export const getUserByEmail = (email: string) => {
  return users.find((user) => user.email === email);
};
