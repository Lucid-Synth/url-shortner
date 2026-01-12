import express from 'express'
import { configDotenv } from 'dotenv';
configDotenv();

const PORT = process.env.PORT || 'your-server-port';

const app = express();

app.get('/',(req:any,res:any) => {
    res.json({
        message: "This is miny's api"
    });
});

app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`);
});