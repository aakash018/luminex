const userReadingLocation: {
  [key: string]: { userId: string; loc: string; bookId: string };
} = {};

export const setReadingLocation = (
  socketID: string,
  epubLoc: string,
  userId: string,
  bookId: string
) => {
  userReadingLocation[socketID] = {
    userId,
    loc: epubLoc,
    bookId,
  };
};

export const getReadingLocations = (socketID: string) => {
  console.log(userReadingLocation);
  return userReadingLocation[socketID];
};
