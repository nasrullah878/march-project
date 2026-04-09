const express = require("express");
const client = require("prom-client");
const app = express();
const PORT = 4000;

// Collect default system metrics
client.collectDefaultMetrics();

// Serve a simple HTML page for "/"
app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nasrullah Khan - DevOps Engineer</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: linear-gradient(to right, #00c6ff, #0072ff);
                color: #fff;
                text-align: center;
                padding: 50px;
            }
            h1 {
                font-size: 3em;
                margin-bottom: 20px;
            }
            p {
                font-size: 1.3em;
                max-width: 700px;
                margin: auto;
                line-height: 1.6;
            }
            .highlight {
                font-weight: bold;
                color: #ffd700;
            }
        </style>
    </head>
    <body>
        <h1>Welcome to Nasrullah Khan's Portfolio</h1>
        <p>
            Hello! I am <span class="highlight">Nasrullah Khan</span>, a passionate <span class="highlight">DevOps Engineer</span> and <span class="highlight">SRE</span>.
            I specialize in <span class="highlight">Kubernetes, Docker, Prometheus, Grafana</span>, and automating cloud infrastructure.
        </p>
        <p>
            DevOps is a culture of collaboration, automation, and monitoring to ensure systems are <span class="highlight">reliable</span>, <span class="highlight">scalable</span>, and <span class="highlight">efficient</span>.
        </p>
        <p>Current CI/CD pipeline status: 🚀 Running smoothly!</p>
        <p>Visit <a href="/metrics" style="color:#ffd700;">/metrics</a> to see Prometheus metrics.</p>
    </body>
    </html>
    `);
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

app.listen(PORT, "0.0.0.0" ,() => {
    console.log(`Server running on port ${PORT}`);
});
