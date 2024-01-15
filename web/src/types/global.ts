export interface ResponseType {
  status: "ok" | "fail";
  message: string;
}

export interface User {
  username: string;
  email: string;
  name: string;
  id: string;
  books: Book[];
  theme: "dark" | "light";
}

export interface Book {
  author: string;
  bookURL: string;
  coverURL: string;
  location: string;
  id: string;
  progress: number;
  name: string;
  userId: string;
  isFavourited: boolean;
  user?: User;
}
