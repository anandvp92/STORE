import express from 'express';

import dotenv from 'dotenv';

import { db_connection } from './config/db.js';

import productrouter from './routes/products_route.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/products",productrouter);

const PORT = process.env.PORT;


app.listen(PORT, ()=>{
    db_connection();
    console.log(`Server is running on http://localhost:${PORT}/`);
});