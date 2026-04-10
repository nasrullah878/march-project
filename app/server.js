const express = require("express");
const client = require("prom-client");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

app.use(bodyParser.urlencoded({extended:true}));

// Prometheus metrics
client.collectDefaultMetrics();

// MySQL connection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"zzzz",
    database:"devops_db"
});

db.connect((err)=>{
    if(err) throw err;
    console.log("MySQL Connected");
});

// Home page with form
app.get("/", (req,res)=>{
res.send(`
<h1>🚀 Nasrullah Khan - DevOps & SRE Engineer</h1>

<h2>DevOps Engineer Portfolio</h2>

<p>Specializing in Kubernetes, Docker, CI/CD, Monitoring and SRE practices.</p>

<form action="/add" method="POST">

<table border="1" cellpadding="10">

<tr>
<th>Name</th>
<th>Role</th>
<th>Skills</th>
</tr>

<tr>
<td><input type="text" name="name"></td>
<td><input type="text" name="role"></td>
<td><input type="text" name="skills"></td>
</tr>

</table>

<br>

<button type="submit">Add Engineer</button>

</form>

`);
});

// Insert into MySQL
app.post("/add",(req,res)=>{

const {name,role,skills}=req.body;

const sql="INSERT INTO engineers (name,role,skills) VALUES (?,?,?)";

db.query(sql,[name,role,skills],(err,result)=>{
    if(err) throw err;
    res.send("Data inserted successfully 🚀");
});

});

// health check
app.get("/health",(req,res)=>{
res.json({status:"OK"});
});

// prometheus metrics
app.get("/metrics", async (req,res)=>{
res.set("Content-Type", client.register.contentType);
res.end(await client.register.metrics());
});

app.listen(PORT,"0.0.0.0",()=>{
console.log(`Server running on port ${PORT}`);
});
