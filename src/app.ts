import express from "express";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 8080);

// Example route
app.get("/", (req, res) => {
    res.send("Hello World");
 });

 export default app;