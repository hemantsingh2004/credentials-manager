import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import env from "dotenv";
env.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));  //Getting the file path to Main
const app = express();
const url = process.env.DB_URL;
const client = new MongoClient(url);
await client.connect();   //Permanently keeping database connected
const dbName = process.env.DB_NAME;
const db = client.db(dbName);
app.use( express.urlencoded({extended: true}));     //Initialized the middleware
app.use(cors());

app.get("/api/data",async(req, res) => {
    const collection = db.collection("");
    const data = await collection.findOne({"name":""});
    console.log(data);
    res.send(data);
})

app.listen(8080, (req, res) => {
    console.log("Server is up and running");
})