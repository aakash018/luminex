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
}

export interface Book {
  author: string;
  bookURL: string;
  coverURL: string;
  location: string;
  id: string;
  name: string;
  pagesRead: number;
  totalPages: number;
  userId: string;
  user?: User;
}
