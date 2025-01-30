import express, { Application } from "express";
import romannumeral from "./routes/romannumeral";

const app: Application = express();

app.get("/", (req, res) => {
  res.send("Home Page");
});
app.use("/romannumeral", romannumeral);

export default app;
