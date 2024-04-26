import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import { encrypt, decrypt } from "./encryption.js";

const addCredential = async (
  credentials,
  user,
  Uri,
  dbName,
  collectionName,
  enKey
) => {
  let client;
  let addedCredentials; //Final Object to be returned
  const saveCredentials = { others: {} }; //Object to be saved to database

  const newCredentials = JSON.parse(credentials);
  //If there is any field named password, it is encrypted with password key
  if (newCredentials.password === "") {
    delete newCredentials.password;
  }
  if (
    newCredentials.password ||
    newCredentials["otherDetail-password"] ||
    newCredentials["otherDetail-pass"]
  ) {
    saveCredentials.others.password = encrypt(
      newCredentials.password ||
        newCredentials["otherDetail-password"] ||
        newCredentials["otherDetail-pass"],
      enKey
    );
    delete (
      newCredentials.password ||
      newCredentials["otherDetail-password"] ||
      newCredentials["otherDetail-pass"]
    );
  }
  //Account Name is encrypted with Account key
  saveCredentials.accountName = newCredentials.accountName;
  delete newCredentials.accountName;

  saveCredentials.signUpType = encrypt(newCredentials.signUpType, enKey);
  delete newCredentials.signUpType;

  if (newCredentials.email) {
    saveCredentials.email = encrypt(newCredentials.email, enKey);
  }
  delete newCredentials.email;

  if(newCredentials.thirdParty){
    const newthirdParty = encrypt("Third Party", enKey);
    saveCredentials.others[`${newthirdParty}`] = encrypt(newCredentials.thirdParty, enKey);
    delete newCredentials.thirdParty;
  }

  //For all Other details, both key and value are encrypted using the detail key
  for (let detail in newCredentials) {
    const newDetail = encrypt(detail, enKey);
    saveCredentials.others[`${newDetail}`] = encrypt(
      newCredentials[detail],
      enKey
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

const getCredentials = async (
  keywords,
  user,
  Uri,
  dbName,
  collectionName,
  enKey
) => {
  let credentialsData;
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(Uri);
    const db = client.db(dbName);

    // Get search parameters from request
    const user_id = user._id;

    // Construct regex pattern for account name search
    if (keywords) {
      const regexPattern = new RegExp(keywords, "i"); // 'i' for case-insensitive
      credentialsData = await db
        .collection(collectionName)
        .find({
          user_id: user_id, // Match user_id
          accountName: { $regex: regexPattern }, // Match account name
        })
        .toArray();
    } else {
      credentialsData = await db
        .collection(collectionName)
        .find({
          user_id: user_id,
        })
        .toArray();
    }
    // Close the connection
    client.close();
  } catch (err) {
    console.error(err);
  }

  if (credentialsData) {
    let sentCredentialsData = [];     //For saving the final Credentials
    for(let data of credentialsData){     //Iterating through all the retrieved data to decrypt it.
    const sentCredentials = { others: {} };

    sentCredentials.accountName = data.accountName;
    delete data.accountName;

    sentCredentials.signUpType = decrypt(data.signUpType, enKey);
    delete data.signUpType;

    if (data.email) {
      sentCredentials.email = decrypt(data.email, enKey);
      delete data.email;
    }

    if (data.others) {                           //Looking for the data to be inserted in others object.
      if (data.others.password) {
        sentCredentials.others.password = decrypt(data.others.password, enKey);
        delete data.others.password;
      }
      for (let detail in data.others) {
        const newDetail = decrypt(detail, enKey);
        sentCredentials.others[`${newDetail}`] = decrypt(
          data.others[detail],
          enKey
        );
      }
    }
    sentCredentialsData.push(sentCredentials);
  }
  return sentCredentialsData;
}
  return;
};

export { addCredential, getCredentials };
