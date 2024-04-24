import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import env from "dotenv";
import session from "express-session";
import passport from "./passport.js";
import { encrypt, decrypt } from "./encryption.js";
import { addUser } from "./users.js";

env.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url)); //Getting the file path to Main
const app = express();
const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

app.use(express.json()); //Parse JSON bodies
// app.use(express.urlencoded({ extended: true })); //Initialized the middleware
app.use(cors());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60, //user info will saved for 1 hours max
    },
  })
);
app.use(passport.session());
app.use(passport.initialize()); // Initialize Passport

app.post("/api/login", (req, res, next) => {
  passport.authenticate('HeaderAuth', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: info.message || "Authentication failed" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ user: user, message: "Login successful" });
    });
  })(req, res, next);
});

app.post("/api/logout", (req, res) => {
  req.logout((err) => {
        if(err) console.log(err);
    });
  res.status(200).send({ message: "Logout successful" });
});

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    const objectId = ObjectId.createFromHexString(id);
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(process.env.USER_COLLECTION);
    const user = await collection.findOne({ _id: objectId });
    delete user.Password;
    client.close();
    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.post("/api/register", async (req, res, next) => {
  const {name, username, password, email } = req.headers;
  if (name && username && password && email) {
    try {
      const registeredUser = await addUser(
        name,
        username,
        email,
        password,
        uri,
        dbName,
        process.env.USER_COLLECTION
      );
      if(registeredUser){
      req.logIn(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        // Send response indicating successful registration and login
        return res
          .status(201)
          .json({
            user: registeredUser,
            message: "User registered and logged in successfully",
          });
      });
    } else {
        return res.status(500).json({error: "Username taken already"});
    }
    } catch (error) {
      console.error("Error registering user:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while registering the user" });
    }
  } else {
    res.status(400).send({ error: "Missing required parameters" });
  }
});

app.get("/api/user", (req, res) => {
  try {
    if (!req.user || !req.user['Fname']) {
      throw new Error('User data not available');
    }
    const username = req.user['Fname'];
    return res.status(200).json({ username });
  } catch (err) {
    console.error('Error fetching username:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(process.env.PORT, () => {
  console.log("Server is up and running");
});
