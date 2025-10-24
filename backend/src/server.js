import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import http from "http"
dotenv.config()
import cookieParser from "cookie-parser"

import { connectDb } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js"
import postRoutes from "./routes/post.routes.js"

const app=express();
const PORT=process.env.PORT

const __dirname=path.resolve()

app.use(cors({
  origin: process.env.NODE_ENV === "production" 
    ? true
    : "http://localhost:5173",
  credentials: true,
}));
app.use(express.json())
app.use(cookieParser())

app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

app.use("/api/auth",authRoutes)
app.use("/api/post",postRoutes)

const server = http.createServer(app);


if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname+"/../frontend/dist")))
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname+"/../frontend/dist/index.html"))
  })
}

server.listen(PORT,()=>{
  console.log(`listnening on port ${PORT}...`);
  connectDb();
})