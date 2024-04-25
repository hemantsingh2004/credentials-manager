import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import { encrypt, decrypt } from "./encryption.js";

const addCredential = async (
  credentials,
  user,
  Uri,
  dbName,
  collectionName,
  accEnKey,
  passEnKey,
  detailEnKey
) => {
  let client;
  let addedCredentials; //Final Object to be returned
  const saveCredentials = {}; //Object to be saved to database

  const newCredentials = JSON.parse(credentials);

  //If there is any field named password, it is encrypted with password key
  if (
    newCredentials.password ||
    newCredentials["otherDetail-password"] ||
    newCredentials["otherDetail-pass"]
  ) {
    saveCredentials.password = encrypt(
      newCredentials.password ||
        newCredentials["otherDetail-password"] ||
        newCredentials["otherDetail-pass"],
      passEnKey
    );
    delete (
      newCredentials.password ||
      newCredentials["otherDetail-password"] ||
      newCredentials["otherDetail-pass"]
    );
  }

  //Account Name is encrypted with Account key
  saveCredentials.accountName = encrypt(newCredentials.accountName, accEnKey);
  delete newCredentials.accountName;

  //For all Other details, both key and value are encrypted using the detail key
  for (let detail in newCredentials) {
    const newDetail = encrypt(detail.slice(12), detailEnKey);
    saveCredentials[`${newDetail}`] = encrypt(
      newCredentials[detail],
      detailEnKey
    );
  }

  //user id is also saved for purpose of searching
  saveCredentials.user_id = user._id;

  //Database is handled correctly for any errors that could occur
  try {
    client = new MongoClient(Uri);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    addedCredentials = await collection.insertOne(saveCredentials);
  } catch (err) {
    console.error("Error adding user:", err);
  } finally {
    if (client) {
      await client.close();
    }
  }
  return addedCredentials;
};

export { addCredential };
