interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  batch?: string;
}

export default User;
