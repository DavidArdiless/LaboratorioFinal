import  express  from "express";
import pelis from "./routes/peliculas.router.js"
import cors from "cors"; 
import "./config.js"
import {PORT} from "./config.js"

const app = express()
app.use(cors());
app.use(express.json())

app.use(pelis)
app.use((req,res,next)=>{
    res.status(404).json({
        message: "Incorrect EndPoint"
    })
})

export default app