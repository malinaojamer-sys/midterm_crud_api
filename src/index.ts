import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
dotenv.config();
import { AppDataSource } from '@config/data-source';
import { userRoutes } from './routes/userRoutes';
import * as dotenv from 'dotenv';
import { Timestamp } from 'typeorm/driver/mongodb/bson.typings.js';



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString()
    })

});
app.use((req, res)=> {
    res.status(404).json({
    success: false,
    error: {
          code: 'ROUTE_NOT_FOUND',
          message: 'Route ${req.method} ${req.url} not found'

    }
});
});

AppDataSource.initialize()
    .then(() => {
        console.log('✅ Database connected successfully!');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📋 Health check: http://localhost:${PORT}/health`);
            console.log(`👥 Users API: http://localhost:${PORT}/api/users`);
        });
    })
    .catch((error) => {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    });