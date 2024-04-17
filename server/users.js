import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

const addUser = async (
  userName,
  email,
  password,
  Uri,
  dbName,
  collectionName
) => {
  let client;
  let registeredUser;
  try {
    client = new MongoClient(Uri);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Check if the username is already present
    const isUnamePresent = await collection.findOne({ Uname: userName });
    if (isUnamePresent) {
      await client.close(); // Close the client before returning
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    let userInfo = {
      Uname: userName,
      Password: hashedPassword,
      email: email,
    };

    // Insert the user into the collection
    const addedUser = await collection.insertOne(userInfo);
    registeredUser = await collection.findOne({ _id: addedUser.insertedId });
    delete registeredUser.Password;
  } catch (err) {
    console.error("Error adding user:", err);
  } finally {
    if (client) {
      await client.close();
    }
  }
  return registeredUser;
};

const authenticateUser = async (
  userName,
  loginPassword,
  Uri,
  dbName,
  collectionName
) => {
  let client;
  let result = false;
  let user;
  try {
    client = new MongoClient(Uri);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Find the user by username
    user = await collection.findOne({ Uname: userName });
    if (!user) {
      // User not found
      await client.close();
      return false;
    }
    // Compare hashed password with the provided password
    result = await bcrypt.compare(loginPassword, user.Password);
    delete user.password;
  } catch (err) {
    console.error("Error authenticating user:", err);
    await client.close();
    return false;
  } finally {
    if (client) {
      await client.close();
    }
    if (result) {
      return user;
    } else {
      return null;
    }
  }
};

export { addUser, authenticateUser };
