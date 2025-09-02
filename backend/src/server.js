

// const express = require("express");
// const notesRoutes = require("./routes/notesRoutes.js");
// const { connectDB } = require("./config/db.js");
// const dotenv = require("dotenv");

// dotenv.config();



// const app = express();
// const PORT = process.env.PORT || 5001;

// // connect to database
// connectDB();

// //middleware

// app.use(express.json());

// app.use("/api/notes", notesRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const notesRoutes = require("./routes/notesRoutes.js");
const { connectDB } = require("./config/db.js");
const rateLimiter = require("./middleware/rateLimiter.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

// our simple custom middleware
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});
