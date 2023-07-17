const connectToMongo = require("./db");
const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const corsOptions = {
  origin: process.env.ORIGIN // frontend URI (ReactJS)
}

connectToMongo();

const app = express();
const port = process.env.PORT;

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth/", require("./routes/auth"));
app.use("/api/genre", require("./routes/genre"));
app.use("/api/video", require("./routes/video"));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
