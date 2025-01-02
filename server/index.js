const express = require('express')
const mongoose = require('mongoose')
const ProductRouter = require('./api/routes/productRoutes')
const UserRouter = require('./api/routes/userRoutes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const next = require("next");
const bodyParser = require("body-parser");


const dev = process.env.NODE_ENV !== "production";
const hostName = dev ? "localhost" : "melvel.com";
const PORT = process.env.PORT || 3001;

const app = next({ dev, hostname: hostName, port: PORT });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    // Middleware
    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(ProductRouter);
    server.use(UserRouter);
    


    // Database connection
    const connectDB = async () => {
      try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("> Successfully connected to Database");
      } catch (err) {
        console.error("> Failed to connect to Database:", err);
      }
    };

    connectDB();

    // Error handling middleware
    server.use((err, req, res, next) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });

    // Handle all requests with Next.js
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    // Start the server
    server.listen(PORT, (err) => {
      if (err) {
        console.error("> Failed to start server:", err);
        process.exit(1);
      }
      console.log(`> Server running on http://${hostName}:${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
