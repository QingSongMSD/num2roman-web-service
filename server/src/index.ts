import app from "./app";

const port: number = 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
