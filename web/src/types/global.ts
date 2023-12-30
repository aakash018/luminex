export interface ResponseType {
  status: "ok" | "fail";
  message: string;
}

export interface User {
  username: string;
  email: string;
  name: string;
  id: string;
}
