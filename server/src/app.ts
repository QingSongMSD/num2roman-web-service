import express, { Application } from "express";
import cors from "cors";
import romannumeral from "./routes/romannumeral";

const app: Application = express();

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Home Page");
});
app.use("/romannumeral", romannumeral);

export default app;
