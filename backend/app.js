const express = require("express");
const userRoutes = require("./routes/user-routes");
const roomRoutes = require("./routes/room-routes");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const Pusher = require("pusher");
const HttpError = require("./models/HttpError");
const config = require('config');
const sendEmail = require('./controllers/account-invite');
const pusherConfig = config.get('pusher');
const PORT = process.env.PORT || 5000;
const app = express();

const pusher = new Pusher(pusherConfig);

connectDB();

// mongoose.connection.once("open", () => {
//   console.log(`MongoDB connected...`);
//   try {
//     const changeStream = mongoose.connection.collection("rooms").watch();
//     changeStream.on("change", (change) => {
//       if (change.operationType === "insert") {
//         pusher.trigger("issues", "newIssue", {
//           'change': change,
//         });
//       } else if (change.operationType === "update") {
//         pusher.trigger("room", "newMessage", {
//           'change': change,
//         });
//       } else {
//         console.log("Error triggering pusher");
//       }
//     });
//   } catch (error) {
//     console.error(error);
//   }
// });

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("API running");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/room", roomRoutes);
app.use('/api/invite', sendEmail);
app.use((req, res, next) => {
  throw new HttpError("Route does not exist", 404);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
