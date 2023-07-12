const connectToMongo = require("./db");
const express = require("express");
const cors = require('cors');

const corsOptions = {
  origin: "https://watch-now-front.onrender.com" // frontend URI (ReactJS)
}

connectToMongo();

const app = express();
const port = 5000;

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth/", require("./routes/auth"));
app.use("/api/genre", require("./routes/genre"));
app.use("/api/video", require("./routes/video"));

app.listen(port || 8000, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
