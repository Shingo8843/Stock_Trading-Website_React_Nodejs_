const Express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();
const finnhub = require("finnhub");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const app = Express();
app.use(cors());

const CONNECT_STRING = process.env.CONNECT_STRING;
const DATABASE_NAME = process.env.MONGO_DATABASE;
const PORT = process.env.PORT || 5038;

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
const POLYGON_API_KEY = process.env.POLYGON_API_KEY;
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

//4.1.1 Company's Description
app.get("/company/:ticker", async (req, res) => {
  const { ticker } = req.params;
  const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${FINNHUB_API_KEY}`;

  try {
    const response = await fetch(url);
    const companyProfile = await response.json();
    res.json(companyProfile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching company profile.");
  }
});

// 4.1.2 Company's Historical Data
app.get("/historical/:ticker", async (req, res) => {
  const { ticker } = req.params;
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setMonth(toDate.getMonth() - 6);
  fromDate.setDate(toDate.getDate() - 1);

  const fromDateString = fromDate.toISOString().split("T")[0];
  const toDateString = toDate.toISOString().split("T")[0];

  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${fromDateString}/${toDateString}?apiKey=${POLYGON_API_KEY}`;

  try {
    const response = await fetch(url);
    const historicalData = await response.json();
    res.json(historicalData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching historical data.");
  }
});

// 4.1.3 Company's Latest Price of Stock
app.get("/quote/:ticker", async (req, res) => {
  const { ticker } = req.params;
  const url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${FINNHUB_API_KEY}`;

  try {
    const response = await fetch(url);
    const quote = await response.json();
    res.json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching quote data.");
  }
});

// 4.1.4 Auto-Complete Search
app.get("/search/:query", async (req, res) => {
  const { query } = req.params;
  const url = `https://finnhub.io/api/v1/search?q=${query}&token=${FINNHUB_API_KEY}`;

  try {
    const response = await fetch(url);
    const searchResults = await response.json();
    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching search results.");
  }
});

// 4.1.5 Company's News
app.get("/news/:ticker", async (req, res) => {
  const { ticker } = req.params;
  const today = new Date().toISOString().split("T")[0];
  const url = `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=2022-01-01&to=${today}&token=${FINNHUB_API_KEY}`;

  try {
    const response = await fetch(url);
    const news = await response.json();
    res.json(news);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching company news.");
  }
});
// 4.1.6 Company’s Recommendation Trends
app.get("/recommendation/:ticker", async (req, res) => {
  const { ticker } = req.params;
  const url = `https://finnhub.io/api/v1/stock/recommendation?symbol=${ticker}&token=${FINNHUB_API_KEY}`;

  try {
    const response = await fetch(url);
    const recommendation = await response.json();
    res.json(recommendation);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching company recommendation.");
  }
});

// 4.1.7 Company’s Insider Sentiment
app.get("/insider/:ticker", async (req, res) => {
  const { ticker } = req.params;
  const url = `https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${ticker}&token=${FINNHUB_API_KEY}`;

  try {
    const response = await fetch(url);
    const insider = await response.json();
    res.json(insider);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching company insider.");
  }
});
// 4.1.8 Company’s Peers
app.get("/peers/:ticker", async (req, res) => {
  const { ticker } = req.params;
  const url = `https://finnhub.io/api/v1/stock/peers?symbol=${ticker}&token=${FINNHUB_API_KEY}`;

  try {
    const response = await fetch(url);
    const peers = await response.json();
    res.json(peers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching company peers.");
  }
});

// 4.1.9 Company’s Earnings
app.get("/earnings/:ticker", async (req, res) => {
  const { ticker } = req.params;
  const url = `https://finnhub.io/api/v1/stock/earnings?symbol=${ticker}&token=${FINNHUB_API_KEY}`;

  try {
    const response = await fetch(url);
    const earnings = await response.json();
    res.json(earnings);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching company earnings.");
  }
});

connectToDatabase();
process.on("SIGINT", () => process.exit());
process.on("SIGTERM", () => process.exit());
