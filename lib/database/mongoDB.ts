
import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config();
const connectionString = process.env.MONGODB_URL as string;
export const dbClient = new MongoClient(connectionString, {});
export const db = dbClient.db("sample_mflix");
