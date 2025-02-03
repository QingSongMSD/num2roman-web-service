import express, { Application } from "express";
import cors from "cors";
import romannumeral from "./routes/romannumeral";

// Creates an instance of an Express application.
const app: Application = express();

// CORS configuration options.
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:4173"],
};

// Middleware to enable CORS with specified options
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Home Page");
});
app.use("/romannumeral", romannumeral);

export default app;
