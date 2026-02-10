const express = require("express");
const { pool, dbEngine } = require("./db");

const app = express();
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  try {
    // Use database-agnostic query
    const healthQuery = dbEngine.includes("postgres") 
      ? "SELECT NOW() as now" 
      : "SELECT NOW() as now";
    
    const result = await pool.executeQuery(healthQuery);
    res.status(200).json({ 
      status: "ok", 
      now: result[0].now,
      engine: dbEngine 
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/api/users", async (_req, res) => {
  try {
    const result = await pool.executeQuery(
      "SELECT id, email FROM users ORDER BY id DESC LIMIT 50"
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`backend listening on ${port}`);
});
