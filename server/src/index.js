import express from 'express';
import { PORT } from './config.js';
import userRoutes from './routes/user.routes.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'



const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('dev'));
app.use(userRoutes)


app.listen(PORT, ()=>{

    console.log('Server on port', PORT);
})



