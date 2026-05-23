// import "dotenv/config";
// import app from "./src/app.js";
// import http from "http";
// import connectDB from "./src/config/database.js";
// import { initSocket } from "./src/sockets/server.socket.js";
// import path from "path";
// import express from "express";
// import { fileURLToPath } from "url";

// const __dirname = path.resolve();

// const PORT = process.env.PORT || 8000;

// // make ready for deployment
// if (process.env.NODE_ENV === "production") {
//   // app.use(express.static(path.join(__dirname, "../Frontend/dist")));

//   // app.get("*", (_, res) => {
//   //   res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
//   // });

//    app.use(express.static(path.join(__dirname, "Frontend/dist")));

//    app.get("*", (_, res) => {
//      res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
//    });
// }

// const httpServer = http.createServer(app);

// initSocket(httpServer);

// connectDB()
//     .catch((err) => {
//         console.error("MongoDB connection failed:", err);
//         process.exit(1);
//     });

// httpServer.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

import "dotenv/config";
import app from "./src/app.js";
import http from "http";
import connectDB from "./src/config/database.js";
import { initSocket } from "./src/sockets/server.socket.js";
import path from "path";
import express from "express";

const __dirname = path.resolve();

const PORT = process.env.PORT || 8000;

try {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "Frontend/dist")));

    app.get("*", (_, res) => {
      res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
    });
  }

  const httpServer = http.createServer(app);

  initSocket(httpServer);

  connectDB()
    .then(() => {
      httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err);
    });
} catch (err) {
  console.error("SERVER ERROR:", err);
}