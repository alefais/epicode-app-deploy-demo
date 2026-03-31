import express from "express";
const app = express();

const PORT = 3000;
const VERSION = process.env.APP_VERSION || "1.0";

app.get("/", (_req, res) => {
  res.json({
    app: "simple-web-server",
    version: VERSION,
    message: `Hello from simple-web-server v${VERSION}!`,
  });
});

app.get("/healthz", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`simple-web-server v${VERSION} listening on port ${PORT}`);
});
