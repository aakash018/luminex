import jwt from "jsonwebtoken";
interface DecodedToken extends jwt.JwtPayload {
  userId: string;
}

// Augment the existing Request interface from Express
declare global {
  namespace Express {
    interface Request {
      decoded?: DecodedToken; // Extend Request object with decoded property
    }
  }
}
