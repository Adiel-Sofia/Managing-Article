const express = require("express");
const app = express();
const userRoutes = require("./routes/article");
const port = 3000;

app.use(express.json());

app.use("/articles", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
