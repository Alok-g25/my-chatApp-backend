require('dotenv').config();

const express =require("express")
const dbConnect=require("./utils/database")
const Route=require("./routes/index")
const cookieParser =require("cookie-parser")
const cors=require("cors")

const {server,app}=require("./utils/socket.js")

app.use(express.json());
app.use(express.static("./public")); // Serve static files from the public directory
app.use("/public", express.static("public")); // Serve public files from the public directory

app.use(cookieParser()); // Parse cookies first
app.use(
    cors({
      origin: ["http://localhost:5173",],
      credentials: true,
    })
  );



app.use("/api",Route)


const port=process.env.PORT || 8001
dbConnect()
server.listen(port,()=>{
    console.log(`server is runnimg http://localhost:${port}`)
})