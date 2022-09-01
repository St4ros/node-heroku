import express from "express";
import morgan from "morgan";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Routes
import indexRoutes from "./routes/index.js";

// Initialize express
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(morgan("dev"));

// routes
app.use(indexRoutes);

//my
app.use(express.urlencoded({extended: true}));
app.use(express.json({type:"*/*"}));
app.use(express.json());
const cors = require("cors");
app.use(cors());


// static files
app.use(express.static(join(__dirname, "public")));

// listening the Server
app.listen(app.get("port"));
console.log("Server on port", app.get("port"));
