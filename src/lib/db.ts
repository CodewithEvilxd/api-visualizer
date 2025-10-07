import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb() {
  const uri = process.env.MONGODB_URI;
  const name = process.env.MONGODB_DB || "api-visualizer";
  if (!uri) return null;
  if (db) return db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(name);
  return db;
}


