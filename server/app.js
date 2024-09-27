require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser")
//connectDB
const connectDB = require("./db/connect")
//routes
const authRouter = require("./routes/auth")
const jobsRouter = require("./routes/jobs")
const auth = require('./middleware/authentication');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Allow the frontend's origin
  credentials: true // Allow credentials (cookies, authentication headers, etc.)
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Frontend URL
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
// extra packages

// routes
app.use('/api/v1/auth',authRouter)
app.use("/api/v1/jobs",auth,jobsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI) 
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
