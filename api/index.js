require("dotenv").config();
const Express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const finnhub = require("finnhub");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const app = Express();
const path = require("path");
app.use(Express.json());
app.use(cors());
app.use(Express.static("dist"));

const CONNECT_STRING = process.env.CONNECT_STRING;
const DATABASE_NAME = process.env.MONGO_DATABASE;
const PORT = process.env.PORT || 8080;

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

app.get("/api/watchlist/GET", async (req, res) => {
  console.log("Getting watchlist");
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
app.post("/api/watchlist/ADD", async (req, res) => {
  console.log("Adding ticker to watchlist");
  try {
    const database = app.locals.database;
    const watchlist = database.collection("watchlist");
    const data = req.body;
    console.log("Adding ticker to watchlist:", data);
    await watchlist.insertOne(data).then((result) => {
      res.json(result);
    });
  } catch (error) {
    console.error("Failed to add ticker to watchlist:", error);
    res.status(500).json({
      error: "An error occurred while adding the ticker to the watchlist",
    });
  }
});
app.delete("/api/watchlist/DELETE/:ticker", async (req, res) => {
  console.log("Deleting ticker from watchlist");
  try {
    const database = app.locals.database;
    const watchlist = database.collection("watchlist");
    const { ticker } = req.params;

    if (!ticker) {
      return res.status(400).json({ error: "Ticker is required" });
    }
    console.log("Deleting ticker:", ticker);
    const result = await watchlist.deleteOne({ ticker });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Ticker not found in watchlist" });
    }

    res.json({
      success: true,
      ticker,
      message: "Ticker removed from watchlist",
    });
  } catch (error) {
    console.error("Failed to remove ticker from watchlist:", error);
    res.status(500).json({
      error: "An error occurred while removing the ticker from the watchlist",
    });
  }
});
app.get("/api/portfolio/GET", async (req, res) => {
  console.log("Getting portfolio");
  const database = app.locals.database;
  const portfolio = database.collection("portfolio");
  const data = await portfolio.find({}).toArray((err, result) => {
    if (err) {
      res.status;
    }
    res.json(result);
  });
  res.json(data);
});
app.post("/api/portfolio/ADD", async (req, res) => {
  console.log("Adding ticker to portfolio");
  const database = app.locals.database;
  const portfolio = database.collection("portfolio");
  const data = req.body;
  await portfolio.insertOne(data).then((result) => {
    res.json(result);
  });
});
app.put("/api/portfolio/UPDATE/:ticker", async (req, res) => {
  console.log("Updating portfolio");
  const database = app.locals.database;
  const portfolio = database.collection("portfolio");
  const { ticker } = req.params;
  const data = req.body;
  await portfolio.updateOne({ ticker }, { $set: data }).then((result) => {
    res.json(result);
  });
});
app.delete("/api/portfolio/DELETE/:ticker", async (req, res) => {
  console.log("Deleting ticker from portfolio");
  try {
    const database = app.locals.database;
    const portfolio = database.collection("portfolio");
    const { ticker } = req.params;
    if (!ticker) {
      return res.status(400).json({ error: "Ticker is required" });
    }
    console.log("Deleting ticker:", ticker);
    const result = await portfolio.deleteOne({ ticker });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Ticker not found in portfolio" });
    }
    res.json({
      success: true,
      ticker,
      message: "Ticker removed from portfolio",
    });
  } catch (error) {
    console.error("Failed to remove ticker from portfolio:", error);
    res.status(500).json({
      error: "An error occurred while removing the ticker from the portfolio",
    });
  }
});
//4.1.1 Company's Description
app.get("/api/company/:ticker", async (req, res) => {
  console.log("Getting company profile");
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
app.get("/api/historical/:ticker", async (req, res) => {
  console.log("Getting historical data");
  const { ticker } = req.params;
  const { fromDate, toDate, timeNumber, timeUnit } = req.query;

  const fromDateString = fromDate;
  const toDateString = toDate;

  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${timeNumber}/${timeUnit}/${fromDateString}/${toDateString}?apiKey=${process.env.POLYGON_API_KEY}`;
  console.log(url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error from Polygon API: ${response.status}`);
    }
    const historicalData = await response.json();
    res.json(historicalData);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error fetching historical data: ${error.message}`);
  }
});

// 4.1.3 Company's Latest Price of Stock
app.get("/api/quote/:ticker", async (req, res) => {
  console.log("Getting quote");
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
app.get("/api/search/:query", async (req, res) => {
  console.log("Searching for company");
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
app.get("/api/news/:ticker", async (req, res) => {
  console.log("Getting company news");
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
app.get("/api/recommendation/:ticker", async (req, res) => {
  console.log("Getting company recommendation");
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
app.get("/api/insider/:ticker", async (req, res) => {
  console.log("Getting company insider");
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
app.get("/api/peers/:ticker", async (req, res) => {
  console.log("Getting company peers");
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
app.get("/api/earnings/:ticker", async (req, res) => {
  console.log("Getting company earnings");
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
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
connectToDatabase();
process.on("SIGINT", () => process.exit());
process.on("SIGTERM", () => process.exit());
