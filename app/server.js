const express = require("express");
const client = require("prom-client");

const app = express();
const PORT = 4000;

// collect default system metrics
client.collectDefaultMetrics();

// Home route
app.get("/", (req, res) => {
    res.send("Hello from DevOps CI/CD Pipeline 🚀");
});

// Health check route
app.get("/health", (req, res) => {
    res.json({status:"OK"});
});

// Prometheus metrics endpoint
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
