const Express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = Express();
app.use(cors());
const CONNECT_STRING = process.env.CONNECT_STRING;
const DATABASE_NAME = process.env.MONGO_DATABASE;

const PORT = process.env.PORT || 5038;

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(CONNECT_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const database = client.db(DATABASE_NAME);
    console.log("Connected to `" + DATABASE_NAME + "`!");
    app.locals.database = database;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Could not connect to the database:", error);
    process.exit(1);
  }
}
app.get("/watchlist/GET", async (req, res) => {
  const database = app.locals.database;
  const watchlist = database.collection("watchlist");
  const data = await watchlist.find({}).toArray((err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(result);
  });
  res.json(data);
});
app.post("/watchlist/ADD", async (req, res) => {
  const database = app.locals.database;
  const watchlist = database.collection("watchlist");
  const data = {
    ticker: "AAPL",
    name: "Apple Inc.",
  };
  await watchlist.insertOne(data).then((result) => {
    res.json(result);
  });
});
app.delete("/watchlist/DELETE", async (req, res) => {
  const database = app.locals.database;
  const watchlist = database.collection("watchlist");
  const ticker = req.params.ticker;
  await watchlist.deleteOne({ ticker });
  res.json({ ticker });
});

connectToDatabase();

process.on("SIGINT", () => process.exit());
process.on("SIGTERM", () => process.exit());
