const { MongoClient } = require("mongodb");
const devices = require("./devices.json");
process.loadEnvFile("./.env.local");

async function main() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const database = client.db("vodafone-iot-app");
    const collection = database.collection("devices");

    async function addDevices() {
      const DEVICES_WITH_CREATED_AT = [];

      for (let x = 0; x < devices.length; x++) {
        await new Promise((resolve) =>
          setTimeout(() => {
            DEVICES_WITH_CREATED_AT.push({
              ...devices[x],
              createdAt: new Date(),
            });
            resolve();
          }, 100)
        );
      }

      return DEVICES_WITH_CREATED_AT;
    }

    const DEVICES_WITH_CREATED_AT = await addDevices();
    const result = await collection.insertMany(DEVICES_WITH_CREATED_AT);

    console.log(`${result.insertedCount} devices were inserted`);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
