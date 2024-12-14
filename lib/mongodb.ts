import { MongoClient } from "mongodb";

const DATABASE = "vodafone-iot-app";
const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in your .env file"
  );
}

if (process.env.NODE_ENV === "development") {
  // Using a global variable to persist the MongoClient instance
  /* eslint-disable @typescript-eslint/no-explicit-any */
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    /* eslint-disable @typescript-eslint/no-explicit-any */
    (global as any)._mongoClientPromise = client.connect();
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

const connectAndGetDatabase = async () => {
  try {
    const client = await clientPromise;
    return client.db(DATABASE);
  } catch (error) {
    throw new Error(
      `Failed to connect to MongoDB or retrieve database: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
};

export { connectAndGetDatabase };
