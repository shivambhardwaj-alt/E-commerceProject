import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './config/ConnectDb.js';
import userRouter from './routes/UserRoutes.js';
import helmet from 'helmet';
import logger from './utils/logger.js';

import productRoutes from './routes/productRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import connectCloudinary from './config/connectCloudinary.js';
import { testConnection } from './config/nodemailer.js';
import { rateLimit } from 'express-rate-limit';


const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 10, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false,
	ipv6Subnet: 56, 
    message : "Too many request please try again later",
	
})
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.json());


const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    logger.info('Route accessed')
    res.send('API is working !!!');
});


// ==========ESTABLISHING CONNECTION AND STARTING THE SERVER ==============
const startServer = async () => {
    try {
        await connectDB();
        connectCloudinary();
        // ==================== TESTING NODEMAILER HERE =========================
        (async() => {
            try  {
                
                await testConnection();
                logger.info("SMTP Connection Succesfully Established");

            }catch(error){
                logger.error("SMTP Connection failed!");
            }
        })();
        // ====================== ROUTES HERE =======================================
        app.use('/api/user',userRouter);
        app.use('/api/product',productRoutes);
        app.use('/api/admin',adminRouter);

       app.listen(PORT, () => {
            logger.info(`Sever is running on ${PORT}`);
        });
    } catch (error) {
        logger.error(`Error happened in opening the server`,error);
    }
};

startServer();
