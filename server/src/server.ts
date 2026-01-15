import express, { type Request, type Response } from 'express';
import authRoutes from './routes/authRoute.js';
import urlRoutes from './routes/urlRoutes.js'
import cors from 'cors'
import { configDotenv } from 'dotenv';
configDotenv();

const PORT = process.env.PORT || 'your-server-port';

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use('/',authRoutes);
app.use('/',urlRoutes);

app.get('/',(req:Request,res:Response) => {
    res.json({
        message: "This is miny's api"
    });
});

app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`);
});