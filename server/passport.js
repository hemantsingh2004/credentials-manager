import passport from "passport";
import { Strategy } from "passport-custom";
import { authenticateUser } from "./users.js";
import env from "dotenv";
env.config();
const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;
const collection = process.env.USER_COLLECTION;

passport.use("HeaderAuth", new Strategy(async (req, done) => {
    const {username, password} = req.headers;

    if (!username || !password) {
      return done(null, false, {
        message: "Username and password are required in the Authorization header",
      });
    }

    try {
      const user = await authenticateUser(
        username,
        password,
        uri,
        dbName,
        collection
      );
      if (!user) {
        return done(null, false, { message: "Incorrect username or password" });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

export default passport