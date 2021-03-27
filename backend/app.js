const express = require("express");
const userRoutes = require("./routes/user-routes");
const connectDB = require('./config/db');
const HttpError = require("./models/HttpError");
const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json({extended: false}));

app.get('/', (req, res) => {
  res.send('API running');
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/user', userRoutes);
app.use((req, res, next) => {
  throw new HttpError('Route does not exist', 404);
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
})
