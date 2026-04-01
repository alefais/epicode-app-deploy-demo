import express from "express";
import redis from "redis";

const app = express();
const client = redis.createClient({
  host: 'redis-db',
  port: 6379
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

var visit_count = 0;
client.set("visits", visit_count, (err) => {
  if (err) {
    console.error("Error initializing visit count in Redis:", err);
  }
});

const PORT = 3000;
const VERSION = process.env.APP_VERSION || "1.0";

app.get("/", (_req, res) => {
  client.get("visits", (err, visits) => {
    if (err) {
      console.error("Error getting visit count from Redis:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    visit_count = (parseInt(visits) || 0) + 1;
    
    client.set("visits", visit_count, (err) => {
      if (err) {
        console.error("Error setting visit count in Redis:", err);
      }
    });

    res.json({
      app: "simple-web-server",
      version: VERSION,
      message: `Hello from simple-web-server v${VERSION}!`,
      visits: `Total visits: ${visit_count}`
    });
  });
});

app.get("/healthz", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`simple-web-server v${VERSION} listening on port ${PORT}`);
});
