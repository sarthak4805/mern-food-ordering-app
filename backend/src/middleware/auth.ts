import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.sendStatus(401); // ✅ don't return
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    // const decoded = jwt.decode(token) as jwt.JwtPayload;
    // const auth0Id = decoded?.sub;

    // if (!auth0Id) {
    //   res.sendStatus(401); // ✅ don't return
    //   return;
    // }

    // const user = await User.findOne({ auth0Id });

    // if (!user) {
    //   res.sendStatus(401); // ✅ don't return
    //   return;
    // }

    // req.auth0Id = auth0Id;
    // req.userId = user._id.toString();
    next(); // ✅ continue to next middleware
  } catch (error) {
    console.error("jwtParse error:", error);
    res.sendStatus(401); // ✅ don't return
  }
};
