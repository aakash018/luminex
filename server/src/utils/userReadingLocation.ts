const userReadingLocation: {
  [key: string]: {
    userId: string;
    loc: string;
    bookId: string;
    progress: number;
  };
} = {};

export const setReadingLocation = (
  socketID: string,
  epubLoc: string,
  userId: string,
  bookId: string,
  progress: number
) => {
  userReadingLocation[socketID] = {
    userId,
    loc: epubLoc,
    bookId,
    progress,
  };
};

export const getReadingLocations = (socketID: string) => {
  return userReadingLocation[socketID];
};
