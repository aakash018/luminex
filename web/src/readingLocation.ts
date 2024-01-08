interface ObjType {
  userId: string;
  loc: string;
  bookId: string;
  progress: number;
}

const userReadingLocation: ObjType = {
  userId: "",
  loc: "",
  bookId: "",
  progress: 0,
};

export const setReadingLocation = (
  epubLoc: string,
  bookId: string,
  progress: number
) => {
  userReadingLocation.loc = epubLoc;
  userReadingLocation.bookId = bookId;
  userReadingLocation.progress = progress;
};

export const getReadingLocations = () => {
  return userReadingLocation;
};

export const clearReadingLocation = () => {
  userReadingLocation.loc = "";
  userReadingLocation.bookId = "";
  userReadingLocation.progress = 0;
};
